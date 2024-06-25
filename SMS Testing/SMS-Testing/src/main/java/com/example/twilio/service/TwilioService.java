package com.example.twilio.service;

import com.example.twilio.model.CustomMessage;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

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
        Message message = Message.creator(
                new PhoneNumber(to),
                new PhoneNumber(fromPhoneNumber),
                body
        ).create();
        messages.add(new CustomMessage(to, body));  // Store the sent message details
    }

    public void receiveMessage(String from, String body) {
        // Log or store the incoming message
        System.out.println("Received message from: " + from + " with body: " + body);
        messages.add(new CustomMessage(from, body));
    }

    public List<CustomMessage> getAllMessages() {
        return messages;
    }
}
