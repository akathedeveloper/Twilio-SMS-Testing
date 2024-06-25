package com.example.twilio.model;

public class CustomMessage {
    private String from;
    private String body;

    public CustomMessage(String from, String body) {
        this.from = from;
        this.body = body;
    }

    // Getters and Setters
    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
