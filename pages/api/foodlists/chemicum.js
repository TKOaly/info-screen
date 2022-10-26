import { fetchChecmicumFoodlist } from "../../../services/unicafeFoodListService";

export default function handle(req, res) {
  return fetchChecmicumFoodlist().then(foodlist => res.json(foodlist));
}
