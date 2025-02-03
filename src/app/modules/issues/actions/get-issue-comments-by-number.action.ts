import { sleep } from "@helpers/sleep";
import { GithubIssue, GitHubLabel } from "../interfaces";
import { environment } from "src/environments/environment.development";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;


export const getIssueComments = async ( issueNumber: string | number ): Promise<GithubIssue[]> => {

  //await sleep(1500);

  try {

    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, {
        headers: {
          Authorization: `Bearer ${ GITHUB_TOKEN }`
        }
      }
    );

    if ( !resp.ok ) throw "Can't load issue comments"

    const issueComments: GithubIssue[] = await resp.json();
    console.log({issueComments});


    return issueComments;
  } catch (error) {

    throw "Can't load issue comments"
  }

}
