import { TestBed } from "@angular/core/testing";
import { IssuesService } from "./issues.service";
import { provideAngularQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { State } from "../interfaces";

describe('IssuesServices', () => {

  let service: IssuesService;
  const queryClient = new QueryClient();

  beforeEach( () => {
    TestBed.configureTestingModule({
      teardown: {
        destroyAfterEach: false
      },
      providers: [
        provideAngularQuery(queryClient),
      ]
    });
    service = TestBed.inject(IssuesService);
  });

  it( 'Should be created', () => {
    expect(service).toBeTruthy();
  })

  it( 'Should load labels', async () => {

    const { data } = await service.labelsQuery.refetch();

    expect(data?.length).toBe(30);

    const [label] = data!;
    //console.log(label);

    expect(typeof label.color).toBe('string')
    expect(typeof label.default).toBe('boolean')
    expect(typeof label.description).toBe('string')
    expect(typeof label.id).toBe('number')
    expect(typeof label.name).toBe('string')
    expect(typeof label.node_id).toBe('string')
    expect(typeof label.url).toBe('string')


  });

  it( 'Should set selected state, OPEN, CLOSED, ALL', async() => {

    service.showIssuesByState(State.Closed);
    expect( service.selectedState() ).toBe(State.Closed);

    const { data: dataClosed } = await service.issuesQuery.refetch();

    dataClosed?.forEach( issue => {
      expect(issue.state).toBe(State.Closed);
    });

    service.showIssuesByState(State.Open);

    const { data: dataOpen } = await service.issuesQuery.refetch();

    dataOpen?.forEach( issue => {
      expect(issue.state).toBe(State.Open);
    });

  });

  it( 'Should set selected labels', async() => {

    service.toggleLabel('Accessibility');
    expect(service.selectedLabels().has('Accessibility')).toBeTrue();

    service.toggleLabel('Accessibility');
    expect(service.selectedLabels().has('Accessibility')).toBeFalse();
  });

  it( 'Should set selected labels', async() => {

    const label = 'Accessibility';

    service.toggleLabel(label);
    expect(service.selectedLabels().has(label)).toBeTrue();

    const { data } = await service.issuesQuery.refetch();

    data?.forEach( (issue) => {
      const hasLabel = issue.labels.some( (l) => l.name === label )
      expect(hasLabel).toBeTrue();
    } )

  });

});


