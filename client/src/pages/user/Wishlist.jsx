import React, { useEffect } from 'react'
import useWishlistStore from '../../store/wishlistStore.js'
import { Link } from 'react-router-dom'
import useCartStore from '../../store/cartStore.js'
import { Trash2 } from 'lucide-react'

const Wishlist = () => {
  const { items, loading, hydrate, remove } = useWishlistStore()
  const addCart = useCartStore(s=> s.add)

  useEffect(()=>{ hydrate() }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-off-white">Your Wishlist</h1>
        <Link to="/menu" className="text-primary hover:underline">Browse menu</Link>
      </div>

      {loading && (
        <div className="rounded-xl border border-surface bg-card h-28 animate-pulse" />
      )}

      {!loading && items.length === 0 && (
        <div className="rounded-xl border border-surface bg-card p-6 text-muted">
          No items yet. Explore the menu and add your favorites.
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map(food => (
          <div key={food._id || food} className="group rounded-xl border border-surface bg-card overflow-hidden">
            <div className="relative h-40 bg-surface">
              {food.image && <img src={food.image} alt={food.name} className="h-full w-full object-cover" />}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-off-white line-clamp-1">{food.name || 'Food Item'}</h3>
              <p className="text-muted text-sm line-clamp-2">{food.description || 'Saved to your wishlist.'}</p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-primary font-bold">₹{food.price ?? 0}</span>
                <div className="flex items-center gap-2">
                  <Link to={`/food/${food._id || food}`} className="px-3 py-1.5 rounded-md border border-surface text-sm hover:bg-surface">Details</Link>
                  <button onClick={()=> addCart(food._id || food, 1)} className="px-3 py-1.5 rounded-md bg-primary hover:bg-primary-600 text-black text-sm font-semibold">Add</button>
                  <button onClick={()=> remove(food._id || food)} className="inline-flex items-center gap-1 text-accent hover:opacity-90">
                    <Trash2 className="w-4 h-4"/> Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist
