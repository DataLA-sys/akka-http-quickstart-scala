import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TepmlateEditorComponent } from './tepmlate-editor.component';

describe('TepmlateEditorComponent', () => {
  let component: TepmlateEditorComponent;
  let fixture: ComponentFixture<TepmlateEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TepmlateEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TepmlateEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
