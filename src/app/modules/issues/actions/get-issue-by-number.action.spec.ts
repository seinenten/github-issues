import { environment } from "src/environments/environment.development";
import { getIssue } from "./get-issue-by-number.action";

const issueNumber = '123'
const BASE_URL = environment.baseUrl;
const GitHub_Token = environment.gitHubToken ;

const mockIssue = {
  id: 123 ,
  number: issueNumber,
  body: '# Hola'
}

describe('GetIssueByNumber action' , () => {

  it('should fetch issue succesfully', async () => {

    const requestUrl = `${BASE_URL}/issues/${issueNumber}`
    const issueResponse = new Response( JSON.stringify(mockIssue), {
      status: 200,
      statusText: 'Ok'
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const issue = await getIssue(issueNumber);

    //console.log(issue);

    expect( window.fetch ).toHaveBeenCalledWith(requestUrl, {
      headers: {
        Authorization: `Bearer ${GitHub_Token}`
      }
    });


  });


  it('should not fetch issue succesfully', async () => {

    const requestUrl = `${BASE_URL}/issues/${issueNumber}`
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Founde'
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    try {
      const issue = await getIssue(issueNumber);
      expect(true).toBeFalse();
    } catch (error) {
      expect(error).toBe(`Can't load issue ${ issueNumber }`);
    }

  });

});
