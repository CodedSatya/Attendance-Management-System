package dev.grp5.attendance;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://127.0.0.1:5500")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}


/*
 * [
    {
        "name": "Satyam",
        "email": "satya@gmail.com",
        "subjectName": "IR",
        "totalClasses": 12,
        "attendedClasses": 12
    },
    {
        "name": "Satyam",
        "email": "satya@gmail.com",
        "subjectName": "DWT",
        "totalClasses": 12,
        "attendedClasses": 11
    }
]
 */