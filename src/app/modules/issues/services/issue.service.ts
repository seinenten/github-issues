import { Injectable, signal } from '@angular/core';
import { injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { getIssue, getIssueComments } from '../actions';
import { GithubIssue } from '../interfaces/github-issue.interface';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issueNumber = signal<string|null>(null);
  private queryClient = injectQueryClient();

  public issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber() ],
    queryFn: () => getIssue( this.issueNumber()! ),
    enabled: this.issueNumber !== null
  }));

  public issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), "comments" ],
    queryFn: () => getIssueComments( this.issueNumber()! ),
    enabled: this.issueNumber !== null
  }));


  setIssueNumber( issueId: string) {
    this.issueNumber.set(issueId);
  }

  prefetchIssue( issueId: string ) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueId ], // Tipo estricto
      queryFn: () => getIssue( issueId ),
      staleTime: 1000 * 60 * 5, // minutos
    })
  }

  // ToDos Si en la primera peticion ya da la informacion. Para que mandar otra peticion http.
  setIssueData( issue: GithubIssue ) {
    this.queryClient.setQueryData(['issue', issue.number.toString()] , issue , {
      updatedAt: Date.now() + 1000 * 60, // Minuto
    });
  }


}
