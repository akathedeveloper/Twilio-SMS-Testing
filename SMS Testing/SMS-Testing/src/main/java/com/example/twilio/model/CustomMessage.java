package com.example.twilio.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomMessage {
    public String id;
    private int statusCode;
    private String from;
    private String to;
    private String body;
    public LocalDateTime timeStamp;
    private String status;
   
}
