import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GithubIssue, State } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  imports: [ CommonModule, RouterLink ],
  templateUrl: './issue-item.component.html',
})
export class IssueItemComponent {

  issue = input.required<GithubIssue>();

  private issueService = inject(IssueService);

  get isOpen() {
    return this.issue().state === State.Open;
  }

  prefetchData() {
    // ToDoS actualizar data
    //this.issueService.prefetchIssue(this.issue().number.toString());
    // ToDos Setear data
    this.issueService.setIssueData(this.issue());
  }

}
