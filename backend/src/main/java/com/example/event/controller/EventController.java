package com.example.event.controller;

import com.example.event.model.Event;
import com.example.event.repository.EventRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {
    private final EventRepository repo;
    public EventController(EventRepository repo){this.repo=repo;}
    @GetMapping
    public List<Event> all(){return repo.findAll();}
    @GetMapping("/{id}")
    public Event get(@PathVariable Long id){return repo.findById(id).orElse(null);}
    @PostMapping
    public Event create(@RequestBody Event e){return repo.save(e);}
    @PutMapping("/{id}")
    public Event update(@PathVariable Long id, @RequestBody Event e){
        e.setId(id);
        return repo.save(e);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){repo.deleteById(id);}
}
