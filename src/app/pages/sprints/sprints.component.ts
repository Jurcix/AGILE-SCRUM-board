import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { filter, map, reduce } from 'ramda';

import { SprintSummary, Sprints } from '../../types/sprint';
import { StoryStates } from '../../types';

const backgroundColor = ['#66cdaa', '#c0eadc'];
const hoverBackgroundColor = ['#9cdfc8', '#d0faec'];
const chartLabels = ['Sugaištas laikas', 'Estimuotas laikas'];

const exceededBackgroundColor = ['#f76c6c', '#66cdaa'];
const exceededHoverBackgroundColor = ['#ee9d9d', '#9cdfc8'];
const exceededChartLabels = ['Viršytas laikas', 'Sugaištas laikas'];

@Component({
  selector: 'app-sprints-component',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit {
  @Input() sprints: SprintSummary[];
  @Output() addSprints = new EventEmitter<Sprints>();

  public visualData = {};
  public availableTimes = [];
  public addSprintsForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.availableTimes = [
      {
        label: '2 dienos',
        amount: 2
      },
      {
        label: '4 dienos',
        amount: 4
      },
      {
        label: '1 savaitė',
        amount: 5
      },
      {
        label: '2 savaitės',
        amount: 10
      },
      {
        label: '4 savaitės',
        amount: 20
      },
    ];
    this.buildAddSprintsForm(this.sprints);
  }

  displayTimeLabel(time: number): string {
    return time > 5 ? 'Svaitės' :
      time === 5 ? 'Savaitė' : 'Dienos';
  }

  formatTime(time: number, timeObj): string {
    return time >= 5 ?
      `${timeObj.startTime / 5 + 1} - ${timeObj.endTime / 5 + 1}` :
      `${timeObj.startTime + 1} - ${timeObj.endTime}`;
  }

  getStoriesInProgressAmount(stories: StoryStates[]) {
    return filter(story => story.state === 'inProgress', stories).length;
  }

  formatChartData(chartData) {
    this.visualData = {
      backgroundColor,
      hoverBackgroundColor,
      chartLabels
    };

    const estimatedTime = chartData.totalStoryAndBugEstimatedTime;
    const loggedTime = chartData.totalStoryAndBugLoggedTime;
    if (estimatedTime && loggedTime) {
      const totalEstimatedTime = reduce((acc, val) => {
        if (val === 'days') {
          return acc + estimatedTime[val] * 480;
        } else if (val === 'hours') {
          return acc + estimatedTime[val] * 60;
        }
        return acc + estimatedTime[val];
      }, 0, Object.keys(loggedTime));

      const totalLoggedTime = reduce((acc, val) => {
        if (val === 'days') {
          return acc + loggedTime[val] * 480;
        } else if (val === 'hours') {
          return acc + loggedTime[val] * 60;
        }
        return acc + loggedTime[val];
      }, 0, Object.keys(estimatedTime));

      if (totalLoggedTime > totalEstimatedTime) {
        this.visualData = {
          backgroundColor: exceededBackgroundColor,
          hoverBackgroundColor : exceededHoverBackgroundColor,
          chartLabels : exceededChartLabels
        };
        return [totalLoggedTime - totalEstimatedTime, totalEstimatedTime];
      }
      return [totalLoggedTime, totalEstimatedTime];
    }

    return [];
  }

  onAddSprints(sprints) {
    sprints.sprintTime = {
      days: sprints.sprintTime
    };
    this.addSprints.emit(sprints);
  }

  private buildAddSprintsForm(sprints) {
    this.addSprintsForm = this.fb.group({
      sprintCount: ['', Validators.required],
      sprintTime: [{
        value: sprints.length ? sprints[sprints.length - 1].time.days : '',
        disabled: !!sprints.length
      }, Validators.required],
    });
  }

  private resetAddSprintsForm() {
    this.addSprintsForm.reset({
      sprintCount: '',
      sprintTime: ''
    });
  }

}
