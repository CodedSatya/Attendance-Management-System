package dev.grp5.attendance.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttendanceUpdateRequest {
  private int totalClasses;
  private int attendedClasses;
}
