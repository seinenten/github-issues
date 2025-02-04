import { sleep } from "@helpers/sleep";
import { GithubIssue, GitHubLabel } from "../interfaces";
import { environment } from "src/environments/environment.development";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;


export const getIssue = async ( issueNumber: string | number ): Promise<GithubIssue> => {

  //await sleep(1500);

  try {

    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}`, {
        headers: {
          Authorization: `Bearer ${ GITHUB_TOKEN }`
        }
      }
    );

    if ( !resp.ok ) throw "Can't load issue"

    const issue: GithubIssue = await resp.json();
    //console.log({issue});


    return issue;
  } catch (error) {

    throw `Can't load issue ${issueNumber}`
  }

}
