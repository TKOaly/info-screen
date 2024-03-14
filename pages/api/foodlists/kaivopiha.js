import { fetchKaivopihaFoodlist } from '../../../services/unicafeFoodListService';

export default function handle(req, res) {
	return fetchKaivopihaFoodlist().then((foodlist) => res.json(foodlist));
}
