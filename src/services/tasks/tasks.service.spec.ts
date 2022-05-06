import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { TasksService } from './tasks.service';

describe('TasksService', () => {
    let http : HttpClient;
    let service = new TasksService(http);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be returns a text with params to search on api', () => {
    const mockFilteredParamResult = '?name=Pennie Dumphries';

    const mockFilteredParams = [
        {
            param: "name",
            value: "Pennie Dumphries"
        }
    ];

    expect(service.getParamsFilter(mockFilteredParams))
        .toBe(mockFilteredParamResult)

  });

});
