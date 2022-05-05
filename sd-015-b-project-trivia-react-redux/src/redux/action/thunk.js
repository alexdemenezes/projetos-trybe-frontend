import { getQuestionByToken } from '../../services/Api';
import { requestQuestionSucess, requestQuestionFail } from './index';

export default function requestQuestionThunk(TOKEN) {
  return (dispatch) => {
    getQuestionByToken(TOKEN)
      .then((response) => {
        const payload = response;
        dispatch(requestQuestionSucess(payload));
      })
      .catch((error) => {
        dispatch(requestQuestionFail(error));
      });
  };
}
