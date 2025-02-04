import { environment } from "src/environments/environment.development";
import { getIssueComments } from "./get-issue-comments-by-number.action";

const issueNumber = '123';

const BASE_URL = environment.baseUrl;
const GitHub_Token = environment.gitHubToken ;

const mockComments: any[] = [
  { id: 1 , body: 'First comment', user: { login: 'user1' } },
  { id: 2 , body: 'Second comment', user: { login: 'user2' } },
];
describe('GetIssueByNumber action' , () => {

  it('should fetch issue succesfully', async () => {

    const requestUrl = `${BASE_URL}/issues/${issueNumber}/comments`
    const issueResponse = new Response( JSON.stringify(mockComments), {
      status: 200,
      statusText: 'Ok'
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const issueComments = await getIssueComments(issueNumber);

    //console.log(issueComments);

    expect( window.fetch ).toHaveBeenCalledWith(requestUrl, {
      headers: {
        Authorization: `Bearer ${GitHub_Token}`
      }
    });

  });

  it('should not fetch issueComments succesfully', async () => {

      const requestUrl = `${BASE_URL}/issues/${issueNumber}/comments`
      const issueResponse = new Response(null, {
        status: 404,
        statusText: 'Not Founde'
      });

      spyOn(window, 'fetch').and.resolveTo(issueResponse);

      try {
        const issue = await getIssueComments(issueNumber);
        expect(true).toBeFalse();
      } catch (error) {
        //console.log(error);
        expect(error).toBe(`Can't load issue comments with issue number: ${ issueNumber }`);
      }

  });


});
