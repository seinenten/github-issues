import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GithubIssue } from '../../interfaces';

import { MarkdownModule } from 'ngx-markdown'

@Component({
  selector: 'issue-comment',
  imports: [MarkdownModule],
  templateUrl: './issue-comment.component.html',
})
export class IssueCommentComponent {

  issue = input.required<GithubIssue>();

}
