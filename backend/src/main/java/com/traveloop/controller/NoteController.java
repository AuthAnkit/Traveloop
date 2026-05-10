package com.traveloop.controller;

import com.traveloop.dto.request.CreateNoteRequest;
import com.traveloop.dto.response.NoteResponse;
import com.traveloop.service.NoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips/{tripId}/notes")
@RequiredArgsConstructor
@Tag(name = "Notes")
public class NoteController {

    private final NoteService noteService;

    @GetMapping
    @Operation(summary = "Get all notes for a trip")
    public ResponseEntity<List<NoteResponse>> getNotes(@PathVariable Long tripId,
                                                        @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(noteService.getNotes(tripId, user.getUsername()));
    }

    @PostMapping
    @Operation(summary = "Create a note")
    public ResponseEntity<NoteResponse> createNote(@PathVariable Long tripId,
                                                    @Valid @RequestBody CreateNoteRequest req,
                                                    @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(noteService.createNote(tripId, req, user.getUsername()));
    }

    @PutMapping("/{noteId}")
    @Operation(summary = "Update a note")
    public ResponseEntity<NoteResponse> updateNote(@PathVariable Long tripId,
                                                    @PathVariable Long noteId,
                                                    @RequestBody CreateNoteRequest req,
                                                    @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(noteService.updateNote(noteId, req, user.getUsername()));
    }

    @DeleteMapping("/{noteId}")
    @Operation(summary = "Delete a note")
    public ResponseEntity<Void> deleteNote(@PathVariable Long tripId,
                                            @PathVariable Long noteId,
                                            @AuthenticationPrincipal UserDetails user) {
        noteService.deleteNote(noteId, user.getUsername());
        return ResponseEntity.noContent().build();
    }
}
