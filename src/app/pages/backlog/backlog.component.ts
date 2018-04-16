import { Story } from './../../types/story';
import { Observable } from 'rxjs/';
import { FilteredUsers } from './../../types/project';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { createSelectorFactory } from '@ngrx/store';
import { path, map, takeLast } from 'ramda';
import { take } from 'rxjs/operators/take';
import { SprintSummary } from '../../types/sprint';

@Component({
  selector: 'app-backlog-component',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  @Input() filteredUsers: Observable<FilteredUsers[]>;
  @Input() stories: Story[];
  @Input() sprints: SprintSummary[];

  @Output() searchUsers = new EventEmitter<Object>();
  @Output() createStory = new EventEmitter<Story>();
  @Output() deleteStories = new EventEmitter<string[]>();
  @Output() moveToSprint = new EventEmitter<Object>();

  selectedSprint = new FormControl('');
  storyForm: FormGroup;
  storyPointOptions = [
    { value: 'extraLarge', name: 'Labai didelė' },
    { value: 'large', name: 'Didelė' },
    { value: 'medium', name: 'Vidutinė' },
    { value: 'small', name: 'Maža' },
    { value: 'extraSmall', name: 'Labai maža' },
    { value: 'extraExtraSmall', name: 'Labai labai maža' },
  ];
  priorityOptions = [
    { value: 'blocker', name: 'Blokuojanti tolesnį darbą' },
    { value: 'critical', name: 'Kritinė' },
    { value: 'major', name: 'Svarbi' },
    { value: 'medium', name: 'Vidutinė' },
    { value: 'minor', name: 'Nesvarbi' },
  ];

  get selectedSprintStories() {
    if (this.selectedSprint.value) {
      const sprintStories = this.sprints.find(
        sprint => sprint.indicator === Number(this.selectedSprint.value)
      ).stories;
      const selectedStories = this.stories.filter(value => path(['selected'], value));
      return [...selectedStories, ...sprintStories];
    }
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildStoryForm();
  }

  buildStoryForm() {
    this.storyForm = this.fb.group({
      name: ['', Validators.required],
      storyPoints: ['', Validators.required],
      priority: ['', Validators.required],
      assignee: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  resetStoryForm() {
    this.storyForm.reset({
      name: '',
      storyPoints: '',
      priority: '',
      assignee: '',
      description: '',
    });
  }

  onCreateStory(story: Story) {
    let userId;
    this.filteredUsers.pipe(
      take(1)
    ).subscribe(value => userId = value);
    this.storyForm.controls['assignee'].setValue(userId);
    this.createStory.emit(story);
  }

  onSearchUsers(searchString: string) {
    this.searchUsers.emit({ email: searchString });
  }

  onDeleteStories() {
    const deleteStories = map(
      story => story.id,
      this.stories.filter(value => path(['selected'], value))
    );

    this.deleteStories.emit(deleteStories);
  }

  onMoveToSprint() {
    const moveStories = map(
      story => story.id,
      this.stories.filter(value => path(['selected'], value))
    );
    this.moveToSprint.emit({ stories: moveStories, indicator: this.selectedSprint.value});
  }
}
