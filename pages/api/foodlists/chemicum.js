import {
    fetchChecmicumFoodlist
} from "../services/unicafeFoodListService";
  
export default function handle(req, res) {
    fetchChecmicumFoodlist().then(foodlist => {
        res.json(foodlist);
    });
}
