import React, { useEffect, useMemo, useState } from 'react'
import useFoodStore from '../../store/foodStore.js'
import useWishlistStore from '../../store/wishlistStore.js'
import useCartStore from '../../store/cartStore.js'
import { Heart } from 'lucide-react'

const Menu = () => {
  const { foods, loading, fetchAll } = useFoodStore()
  const { items: wishlist, add: addWish, remove: removeWish } = useWishlistStore()
  const { add: addCart } = useCartStore()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('')

  useEffect(()=>{ fetchAll() }, [])

  const categories = useMemo(()=>{
    const set = new Set(foods.map(f=> f.category))
    return ['All', ...Array.from(set)]
  }, [foods])

  const filtered = useMemo(()=>{
    let list = [...foods]
    if (category !== 'All') list = list.filter(f=> f.category === category)
    if (search) list = list.filter(f=> f.name.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'price') list.sort((a,b)=> (a.price||0)-(b.price||0))
    if (sort === '-price') list.sort((a,b)=> (b.price||0)-(a.price||0))
    if (sort === 'createdAt') list.sort((a,b)=> new Date(a.createdAt)-new Date(b.createdAt))
    if (sort === '-createdAt') list.sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt))
    return list
  }, [foods, category, search, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-off-white">Menu</h1>

      <div className="grid gap-3 md:grid-cols-4">
        <input
          value={search}
          onChange={e=>setSearch(e.target.value)}
          placeholder="Search foods..."
          className="md:col-span-2 px-4 py-2 rounded-md bg-card border border-surface text-off-white placeholder:text-muted"
        />
        <select value={category} onChange={e=>setCategory(e.target.value)} className="px-4 py-2 rounded-md bg-card border border-surface text-off-white">
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)} className="px-4 py-2 rounded-md bg-card border border-surface text-off-white">
          <option value="">Sort</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="createdAt">Oldest</option>
          <option value="-createdAt">Newest</option>
        </select>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading && Array.from({ length: 8 }).map((_,i)=> (
          <div key={i} className="rounded-xl border border-surface bg-card h-56 animate-pulse" />
        ))}
        {!loading && filtered.map(food => (
          <div key={food._id} className="group rounded-xl border border-surface bg-card overflow-hidden">
            <div className="relative h-40">
              <img src={food.image} alt={food.name} className="h-full w-full object-cover" />
              <button
                onClick={()=> (wishlist?.some(w => (w._id || w) === food._id) ? removeWish(food._id) : addWish(food._id))}
                className="absolute top-2 right-2 rounded-full p-2 bg-surface hover:opacity-90"
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlist?.some(w => (w._id || w) === food._id) ? 'text-accent' : 'text-muted'}`} />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-off-white line-clamp-1">{food.name}</h3>
              <p className="text-muted text-sm line-clamp-2">{food.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-primary font-bold">₹{food.price}</span>
                <div className="flex items-center gap-2">
                  <a href={`/food/${food._id}`} className="px-3 py-1.5 rounded-md border border-surface text-sm hover:bg-surface">Details</a>
                  <button onClick={()=> addCart(food._id, 1)} className="px-3 py-1.5 rounded-md bg-primary hover:bg-primary-600 text-black text-sm font-semibold">Add</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu
