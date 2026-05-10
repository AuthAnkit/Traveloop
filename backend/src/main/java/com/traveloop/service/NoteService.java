package com.traveloop.service;

import com.traveloop.dto.request.CreateNoteRequest;
import com.traveloop.dto.response.NoteResponse;
import com.traveloop.entity.Trip;
import com.traveloop.entity.TripNote;
import com.traveloop.entity.TripStop;
import com.traveloop.exception.ResourceNotFoundException;
import com.traveloop.exception.UnauthorizedException;
import com.traveloop.repository.TripNoteRepository;
import com.traveloop.repository.TripStopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final TripNoteRepository noteRepository;
    private final TripService tripService;
    private final TripStopRepository stopRepository;

    public List<NoteResponse> getNotes(Long tripId, String email) {
        tripService.findAndVerifyOwner(tripId, email);
        return noteRepository.findByTripIdOrderByCreatedAtDesc(tripId)
                .stream().map(this::mapToResponse).toList();
    }

    @Transactional
    public NoteResponse createNote(Long tripId, CreateNoteRequest req, String email) {
        Trip trip = tripService.findAndVerifyOwner(tripId, email);
        TripStop stop = null;
        if (req.getTripStopId() != null) {
            stop = stopRepository.findById(req.getTripStopId())
                    .orElseThrow(() -> new ResourceNotFoundException("TripStop", req.getTripStopId()));
        }
        TripNote note = TripNote.builder()
                .trip(trip).tripStop(stop)
                .title(req.getTitle()).content(req.getContent())
                .build();
        return mapToResponse(noteRepository.save(note));
    }

    @Transactional
    public NoteResponse updateNote(Long noteId, CreateNoteRequest req, String email) {
        TripNote note = getEntityById(noteId);
        verifyOwner(note, email);
        if (req.getTitle() != null) note.setTitle(req.getTitle());
        if (req.getContent() != null) note.setContent(req.getContent());
        return mapToResponse(noteRepository.save(note));
    }

    @Transactional
    public void deleteNote(Long noteId, String email) {
        TripNote note = getEntityById(noteId);
        verifyOwner(note, email);
        noteRepository.delete(note);
    }

    private void verifyOwner(TripNote note, String email) {
        if (!note.getTrip().getUser().getEmail().equals(email)) {
            throw new UnauthorizedException("Not your note");
        }
    }

    private TripNote getEntityById(Long id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note", id));
    }

    private NoteResponse mapToResponse(TripNote n) {
        return NoteResponse.builder()
                .id(n.getId()).tripId(n.getTrip().getId())
                .tripStopId(n.getTripStop() != null ? n.getTripStop().getId() : null)
                .title(n.getTitle()).content(n.getContent())
                .createdAt(n.getCreatedAt())
                .build();
    }
}
