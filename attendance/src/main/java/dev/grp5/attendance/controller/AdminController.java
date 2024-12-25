package dev.grp5.attendance.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.grp5.attendance.model.AdminRequest;
import dev.grp5.attendance.model.AdminResponse;
import dev.grp5.attendance.model.Attendance;
import dev.grp5.attendance.model.AttendanceUpdateRequest;
import dev.grp5.attendance.model.ResponseAttendance;
import dev.grp5.attendance.model.User;
import dev.grp5.attendance.model.UserRequest;
import dev.grp5.attendance.repository.AttendanceRepository;
import dev.grp5.attendance.repository.UserRepository;
import dev.grp5.attendance.service.AttendanceService;
import dev.grp5.attendance.service.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5500")
public class AdminController {
  
  @Autowired
  private UserService userService;
  
  @Autowired
  private AttendanceService attendanceService;

  @PostMapping("/login")
  public ResponseEntity<AdminResponse> login(@RequestBody UserRequest u){
    User user = userService.login(u);
    if (user != null) {
      AdminResponse ad = new AdminResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());
      return ResponseEntity.ok(ad);
    }
    return ResponseEntity.badRequest().build();
  }

  @GetMapping("/getStudents")
  public List<AdminResponse> getStudents() {
      List<User> c = userService.findAllUsers();
      List<AdminResponse> res = new ArrayList<>();
      for(User s : c){
        if(!s.getRole().equals("admin")){
          AdminResponse ad = new AdminResponse(s.getId(), s.getName(), s.getEmail(), s.getRole());
          res.add(ad);
        }
      }

      return res;
  }
  @PostMapping("/student")
  public List<ResponseAttendance> postMethodName(@RequestBody AdminRequest  emailId) {
      
      return attendanceService.getAttendanceByUseId(userService.findUserByEmail(emailId.getEmail()).getId());
  }

  @PutMapping("/updateAttendance/{email}")
  public ResponseEntity<?> putMethodName(@PathVariable String email, @RequestBody Map<String, AttendanceUpdateRequest> entity) {
      //TODO: process PUT request
      boolean isUpdated = attendanceService.updateAttendance(email, entity);
      if(isUpdated){
        System.out.println("Created");
        return ResponseEntity.ok("Attendance Updated Succesfully");

      }else{
        return ResponseEntity.badRequest().body("Failed to update Attendance.");
      }
  }
  
  
}
