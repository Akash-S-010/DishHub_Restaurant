import React from 'react'
import Button from '../../components/ui/Button'
import { Heart } from 'lucide-react'

const FoodCard = ({ food, isFavorite = false, onToggleWishlist = () => {}, onAdd = () => {}, onDetails = () => {} }) => {
  return (
    <div className="group rounded-xl border border-surface bg-card overflow-hidden">
      <div className="relative h-40">
        {food.image && <img src={food.image} alt={food.name} className="h-full w-full object-cover" />}

        <button
          onClick={() => onToggleWishlist(food._id)}
          className="absolute top-2 right-2 rounded-full p-2 bg-black hover:opacity-90"
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'text-accent' : 'text-muted'}`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-off-white line-clamp-1">{food.name}</h3>
        <p className="text-muted text-sm line-clamp-2">{food.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-primary font-bold">₹{food.price}</span>
          <div className="flex items-center gap-2">
            <Button onClick={() => onDetails(food._id)} className="rounded-md border border-surface text-sm bg-surface text-off-white">Details</Button>
            <Button title="Add" onClick={() => onAdd(food._id)} className="rounded-md text-sm" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
