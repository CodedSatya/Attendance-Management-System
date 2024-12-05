package dev.grp5.attendance.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {
  private String email;
  private String password;
}
