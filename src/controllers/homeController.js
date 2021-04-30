import { getComments } from '../model/Comment';

async function renderHomePage(request, response) {
  let comments;
  try {
    comments = await getComments();
  } catch (error) {
    comments = [];
  }

  response.render('home', {
    comments,
  });
}

export default {
  renderHomePage,
};
