package com.example.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Health;

@RestController
@RequestMapping("/api/v1")
public class HealthController {

  @GetMapping("/health")
  public Health get() {
    Health health = new Health();
    health.message = "OK";
    return health;
  }
  
}
