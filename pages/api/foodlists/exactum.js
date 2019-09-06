import {
    fetchExactumFoodlist,
} from "../services/unicafeFoodListService";
  
export default function handle(req, res) {
    fetchExactumFoodlist().then(foodlist => {
        res.json(foodlist);
    });
}
  