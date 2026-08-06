package com.example.event.repository;

import com.example.event.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    List<Participant> findByEventId(Long eventId);
}
