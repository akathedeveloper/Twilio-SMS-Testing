package com.example.twilio.service;

import com.example.twilio.model.CustomMessage;
import com.twilio.Twilio;
import com.twilio.exception.ApiException;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class TwilioService {

    private final String accountSid;
    private final String authToken;
    private final String fromPhoneNumber;
    private final List<CustomMessage> messages = new ArrayList<>();

    @Autowired
    public TwilioService(@Value("") String accountSid,
                         @Value("") String authToken,
                         @Value("") String fromPhoneNumber) {
        this.accountSid = accountSid;
        this.authToken = authToken;
        this.fromPhoneNumber = fromPhoneNumber;
    }

    @PostConstruct
    public void initTwilio() {
        Twilio.init(accountSid, authToken);
    }

    public void sendMessage(String to, String body) {
        try{
        Message message = Message.creator(
                new PhoneNumber(to),
                new PhoneNumber(fromPhoneNumber),
                body
        ).create();
        Integer errorCode = message.getErrorCode(); // Get error code
        int statusCode = errorCode != null ? errorCode.intValue() : 0;
//        LocalDateTime timestamp = LocalDateTime.now();
//        System.out.println("Sent message at: " + timestamp.format(DateTimeFormatter.ISO_DATE_TIME));
        CustomMessage customMessage = new CustomMessage(
            UUID.randomUUID().toString(),
            statusCode,
            fromPhoneNumber,
            to,
            body,
            LocalDateTime.now(),
            message.getStatus().toString()
        );
        messages.add(customMessage);
        }catch(ApiException e){
            throw new RuntimeException("Failed to send message: " + e.getMessage(), e);
        }
    }

    public void receiveMessage(String from, String body) {
        // Log or store the incoming message
        System.out.println("Received message from: " + from + " with body: " + body);
        LocalDateTime timestamp = LocalDateTime.now();
//        System.out.println("Received message at: " + timestamp.format(DateTimeFormatter.ISO_DATE_TIME));
        messages.add(new CustomMessage(UUID.randomUUID().toString(),200,from,fromPhoneNumber, body,LocalDateTime.now(),"RECEIVED"));
    }

    public List<CustomMessage> getAllMessages() {
        return messages;
    }
}
