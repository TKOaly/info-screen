import {
  fetchExactumFoodlist,
  fetchChecmicumFoodlist
} from "../services/unicafeFoodListService";

export const getExactumFoodlist = (_, res) => {
  fetchExactumFoodlist().then(foodlist => {
    res.json(foodlist);
  });
};

export const getChemicumFoodlist = (_, res) => {
  fetchChecmicumFoodlist().then(foodlist => {
    res.json(foodlist);
  });
};
