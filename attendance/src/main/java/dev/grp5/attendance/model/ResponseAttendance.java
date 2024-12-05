package dev.grp5.attendance.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseAttendance {
  private String name;
  private String email;
  private String subjectName;
  private Integer totalClasses;
  private Integer attendedClasses;
}
