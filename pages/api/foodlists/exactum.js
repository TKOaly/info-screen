import { fetchExactumFoodlist } from "../../../services/unicafeFoodListService";

export default function handle(req, res) {
  return fetchExactumFoodlist().then(foodlist => res.json(foodlist));
}
