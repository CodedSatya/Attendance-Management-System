package dev.grp5.attendance.service;


import dev.grp5.attendance.model.Attendance;
import dev.grp5.attendance.model.AttendanceUpdateRequest;
import dev.grp5.attendance.model.ResponseAttendance;
import dev.grp5.attendance.model.User;
import dev.grp5.attendance.repository.AttendanceRepository;
import dev.grp5.attendance.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AttendanceService {
    @Autowired
    private AttendanceRepository attendanceRepository;
    
    @Autowired
    private UserRepository userRepository;

    public List<ResponseAttendance> getAttendanceByUseId(Long userId){
        List<Attendance> a = attendanceRepository.findByUserId(userId);
        List<ResponseAttendance> res = new ArrayList<>();
        for (Attendance attendance : a) {
            ResponseAttendance responseAttendance = new  ResponseAttendance(attendance.getUser().getName(), attendance.getUser().getEmail(), attendance.getSubName(), attendance.getUser().getRole(), attendance.getTotalClasses(), attendance.getAttendedClasses());
            res.add(responseAttendance);

        }
        return res;
    }

    public boolean updateAttendance(String email,Map<String, AttendanceUpdateRequest> m){
        User user = userRepository.findByEmail(email);
        // System.out.println(user.toString());
        if(user != null){
            for(Map.Entry<String, AttendanceUpdateRequest> entry : m.entrySet() ){
                String subjectName = entry.getKey();
                System.out.println(m.entrySet());
                System.out.println(subjectName);
                AttendanceUpdateRequest data = entry.getValue();
                System.out.println(data.toString());
                Attendance attendance = attendanceRepository.findByUserIdAndSubName(user.getId(), subjectName);
                System.out.println("Attendance Found");
                System.out.println(attendance);
                if(attendance != null){
                    attendance.setAttendedClasses(data.getAttendedClasses());
                    System.out.println(data.getAttendedClasses());
                    attendance.setTotalClasses(data.getTotalClasses());
                    System.out.println(data.getTotalClasses());
                    System.out.println("Got data");
                    attendanceRepository.save(attendance);
                    System.out.println("Saved.");
                }else{
                    return false;
                }
            }
            return true;
        }
        
        return false;
    }

}
