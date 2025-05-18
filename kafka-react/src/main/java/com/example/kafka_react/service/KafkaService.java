package com.example.kafka_react.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaService {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;
    private String message;

    public String postData(String message){
        kafkaTemplate.send("testing" ,message);
        return message;
    }
    @KafkaListener(topics = "testing" , groupId = "my-group")
    public String consumeData(String message){
        this.message = message;
        return message;
    }

    public String getMessage(){
        System.out.println("received");
        return message;
    }
}
