package com.example.twilio.controller;

import com.example.twilio.model.CustomMessage;
import com.example.twilio.service.TwilioService;
import com.twilio.twiml.MessagingResponse;
import com.twilio.twiml.messaging.Body;
import com.twilio.twiml.messaging.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class TwilioController {

    @Autowired
    private TwilioService twilioService;

    @PostMapping("/send")
    public void sendMessage(@RequestParam String to, @RequestParam String body) {
        twilioService.sendMessage(to, body);
    }

    @PostMapping(value = "/receive", produces = "application/xml")
    public String receiveMessage(@RequestBody MultiValueMap<String, String> formData) {
        String from = formData.getFirst("From");
        String body = formData.getFirst("Body");

        // Log or process the received message
        twilioService.receiveMessage(from, body);

        // Create a TwiML response
        Message message = new Message.Builder()
                .body(new Body.Builder("Your message has been received.").build())
                .build();
        MessagingResponse response = new MessagingResponse.Builder()
                .message(message)
                .build();

        return response.toXml();
    }

    @GetMapping("/all")
    public List<CustomMessage> getAllMessages() {
        return twilioService.getAllMessages();
    }
}
