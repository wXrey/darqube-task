import axios from "axios";
import {
  getNewsDataStart,
  getNewsDataSuccess,
  getNewsDataError,
} from "./slice";

const url =
  "https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2021-03-01&to=2021-03-15&token=bpjsf67rh5r9328ecgvg";

export function getNewsData() {
  return (dispatch: any) => {
    dispatch(getNewsDataStart());
    return axios(url)
      .then((res) => dispatch(getNewsDataSuccess(res.data)))
      .catch((err) => dispatch(getNewsDataError(err)));
  };
}
