package com.example.kafka_react.controller;


import com.example.kafka_react.service.KafkaService;
import com.fasterxml.jackson.core.JsonToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/kafka")
public class KafkaController {

    @Autowired
    private KafkaService service;

    @PostMapping
    public ResponseEntity<String> sendMessage(@RequestBody String message){
        if(message.charAt(message.length()-1) == '='){
            System.out.println(message.substring(0,message.length()-1));
        }
        return  ResponseEntity.ok(service.postData(message));
    }

    @GetMapping
    public ResponseEntity<String> getMessage(){
        return ResponseEntity.ok(service.getMessage());
    }
}
