import { fetchFoodlists } from "../../../services/unicafeFoodListService";

export default function handle(req, res) {
  fetchFoodlists().then((foodlists) => {
    res.json(foodlists);
  });
}

