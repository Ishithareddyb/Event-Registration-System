package com.example.event.controller;

import com.example.event.model.Participant;
import com.example.event.model.Event;
import com.example.event.repository.ParticipantRepository;
import com.example.event.repository.EventRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participants")
@CrossOrigin(origins = "*")
public class ParticipantController {
    private final ParticipantRepository prepo;
    private final EventRepository erepo;
    public ParticipantController(ParticipantRepository prepo, EventRepository erepo){
        this.prepo=prepo; this.erepo=erepo;
    }

    @GetMapping
    public List<Participant> all(){return prepo.findAll();}

    @GetMapping("/event/{eventId}")
    public List<Participant> byEvent(@PathVariable Long eventId){return prepo.findByEventId(eventId);}

    @PostMapping
    public Participant register(@RequestBody Participant p){
        if(p.getEvent()!=null && p.getEvent().getId()!=null){
            Event ev = erepo.findById(p.getEvent().getId()).orElse(null);
            p.setEvent(ev);
        }
        return prepo.save(p);
    }
}
