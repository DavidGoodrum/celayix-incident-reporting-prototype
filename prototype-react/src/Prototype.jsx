/*
 * Incident reporting click-through, ported from the Claude Design canvas "Incident reporting prototype — TEAMXP"
 * (board "Incident reporting · click-through", Main.dc.html, as of Nov 12, 2026).
 * The template became JSX over renderVals(); the logic class is carried across as written, so changes on the canvas
 * can be copied over method by method. Every canvas board is a scenario (see SCENARIOS in App.jsx).
 */
/* eslint-disable */
import React from 'react'
import * as DS from './ds/teamxp.js'
import photoTree from './assets/fallen-tree-parking.svg'
import photoCar from './assets/fallen-tree-car.svg'
import photoLane from './assets/fire-lane-cleared.svg'

// Example photos (drawn illustrations) standing in for the canvas's uploaded photos.
const PHOTOS = [photoTree, photoCar, photoLane]

export default class Prototype extends React.Component {
  constructor(props) {
    super(props);
    var self = this;
    this.NS = 'CelayixTeamXPMobileDesignSystem_b1db4d';
    this._anchor = { current: null }; // the Add tile, for the library AttachMenu
    this.PHOTOS = PHOTOS;
    this.FILES = ['North_lot_site_plan.pdf', 'Tree_service_quote.pdf', 'Fire_lane_map.pdf'];
    // Mock areas and checkpoints for the grouped picker (to confirm with the site setup).
    this.CHECKPOINT_GROUPS = [
      { label: 'Main access', options: ['Front Door', 'Lobby turnstiles'] },
      { label: 'Ground floor', options: ['Reception', 'Gift shop'] },
      { label: 'West side', options: ['Courtyard', 'Loading bay'] },
      { label: 'Exterior', options: ['North Parking Lot', 'South gate'] }
    ];
    this.ENHANCED = 'A tree fell across the north parking area at Police Museum, blocking three parking bays and the designated fire lane. Branches are resting on a parked vehicle. The fire lane must be cleared before the end of the shift; until then, keep the area closed to traffic.';
    this.DICTATED = 'Tree came down across the north parking spaces, blocking three bays and the fire lane. Branches are on a parked car.';
    this.COLKEY = { hour: 'tpHour', min: 'tpMin', mer: 'tpMer' };
    this.DEFAULT_WHEN = { d: 24, hour: 3, min: 12, mer: 1 };
    this._wheels = {};
    this._wheelTimers = {};
    this._pressTimer = null;
    this._pressFrom = null;
    this._pressFired = false;
    this._emergencyTimer = null;
    // Mock filed reports for Report history (the last 30 days).
    this.PAST = [
      { id: 'p2', aiTitle: 'Light out above west stairwell', shiftId: 'mar23', day: 'Yesterday', date: 'Mar 23, 2026', time: '9:55 PM', syncedAt: '9:56 PM', category: 'Facility', priority: 'Low', where: 'Courtyard',
        text: 'Light out above the west stairwell, second fixture from the door. Stairwell is dim but still passable.',
        enhanced: 'A light fixture above the west stairwell (second from the door) is out. The stairwell remains passable but is poorly lit; maintenance should replace the fixture.',
        site: 'Police Museum', shift: '3:00 PM - 11:00 PM', tour: 'Perimeter Sweep', checkpoint: 'Courtyard',
        followUps: [
          { time: '10:20 PM', text: 'Maintenance says the fixture needs a new ballast. Taped a caution sign at the top of the stairs.', attachments: [], details: [] },
          { time: '10:48 PM', text: 'Temporary lamp placed on the landing. Stairwell is lit again.', attachments: [], details: [] }
        ] },
      { id: 'p1', aiTitle: 'Loading bay door left propped open', shiftId: 'mar23', day: 'Yesterday', date: 'Mar 23, 2026', time: '3:48 PM', syncedAt: '3:49 PM', category: 'Access control', priority: 'Normal', where: 'Loading bay',
        text: 'Loading bay door was propped open with a crate, no staff nearby. Moved the crate inside and closed the door. It latches fine.',
        enhanced: 'The loading bay door at Police Museum was found propped open with a wooden crate and left unattended. The guard removed the crate and secured the door; the latch is working.',
        site: 'Police Museum', shift: '3:00 PM - 11:00 PM', tour: 'Started outside a tour', checkpoint: 'Loading bay' },
      { id: 'p3', aiTitle: 'Person climbing south gate fence', shiftId: 'mar19', day: 'Thu, Mar 19', date: 'Mar 19, 2026', time: '2:20 PM', syncedAt: '2:20 PM', category: 'Suspicious activity', priority: 'Normal', where: 'South gate',
        text: 'Person climbing the south gate fence left when asked. Checked the fence and gate, no damage found.',
        enhanced: 'An individual was seen climbing the south gate fence and left when asked by the guard. The fence and gate were inspected and no damage was found.',
        site: 'Police Museum', shift: '8:00 AM - 4:00 PM', tour: 'Started outside a tour', checkpoint: 'South gate' }
    ].map(function (p) {
      return Object.assign(p, { filedAt: p.time, attachments: [], followUps: p.followUps || [], requiresAttention: false, noteNotified: false,
        details: [
          { label: 'Site', value: p.site }, { label: 'Shift', value: p.shift }, { label: 'Tour', value: p.tour }, { label: 'Checkpoint', value: p.checkpoint },
          { label: 'Occurrence time', value: p.date + ' · ' + p.time }, { label: 'Captured location', value: '49.2827° N, 123.1207° W' }
        ] });
    });
    // Mock schedule (March 2026). 'mar24' is the current shift shown on the Dashboard.
    this.SHIFTS = [
      { id: 'mar19', weekday: 'THU', month: 'Mar', day: '19', date: 'March 19, 2026', dateNum: '03/19/2026', time: '8:00 AM - 4:00 PM', total: '8.00', site: 'Police Museum', customer: 'Museum Group', status: 'worked' },
      { id: 'mar20', weekday: 'FRI', month: 'Mar', day: '20', date: 'March 20, 2026', dateNum: '03/20/2026', time: '10:00 PM - 6:00 AM', total: '8.00', site: 'Harbour Warehouse', customer: 'Harbour Logistics', status: 'worked' },
      { id: 'mar23', weekday: 'MON', month: 'Mar', day: '23', date: 'March 23, 2026', dateNum: '03/23/2026', time: '3:00 PM - 11:00 PM', total: '8.00', site: 'Police Museum', customer: 'Museum Group', status: 'worked' },
      { id: 'mar24', weekday: 'TUE', month: 'Mar', day: '24', date: 'March 24, 2026', dateNum: '03/24/2026', time: '4:12 PM - 11:12 PM', total: '7.80', site: 'Police Museum', customer: 'Museum Group', status: 'scheduled', current: true },
      { id: 'mar25', weekday: 'WED', month: 'Mar', day: '25', date: 'March 25, 2026', dateNum: '03/25/2026', time: '8:00 AM - 4:00 PM', total: '8.00', site: 'Police Museum', customer: 'Museum Group', status: 'scheduled' }
    ];
    this.state = this.initialState();
    this.scenario = (props && props.scenario) || 'default';
    this.applyScenario(this.scenario);

    this.h = {
      goShift: function () { self.setState({ screen: 'shift' }); },
      onToursBack: function () { self.setState({ screen: self.state.tourFrom === 'shiftDetail' ? 'shiftDetail' : 'shift', tourSearching: false, tourQuery: '' }); },
      goTourFromDetail: function () { self.setState({ screen: 'tour', tourFrom: 'shiftDetail' }); },
      goTours: function () { self.setState({ screen: 'tours', tourFrom: 'shift' }); },
      goTour: function () { self.setState({ screen: 'tour' }); },
      goCheckpoint: function () { self.setState({ screen: 'checkpoint' }); },
      goTourDetails: function () { self.setState({ screen: 'tourDetails' }); },
      toggleTourInfo: function () { self.setState({ tourInfoOpen: !self.state.tourInfoOpen }); },
      onScan: function () { if (!self.state.cpDone) self.setState({ screen: 'checkpoint' }); },
      onMarkDone: function () { self.setState({ cpReqDone: true }); },
      onCompleteCheckpoint: function () { self.setState({ cpDone: true, screen: 'tour' }); },

      onReportDown: function (e) {
        // Only the header's Report (clipboard) action: tap opens the action sheet (on click, see hdrActions), a long press opens a new incident.
        if (!(e.target && e.target.closest && e.target.closest('button[aria-label="Report"]'))) return;
        var from = e.currentTarget.getAttribute('data-from');
        self._pressFrom = from;
        self._pressFired = false;
        clearTimeout(self._pressTimer);
        self._pressTimer = setTimeout(function () { self._pressFired = true; self.openReport(from); }, 480);
      },
      onReportUp: function () {
        // The sheet opens on the click that follows, not here: on a touch screen, opening it on release let the same tap land on its scrim and close it.
        clearTimeout(self._pressTimer);
        self._pressFrom = null;
      },
      onReportLeave: function () { clearTimeout(self._pressTimer); self._pressFrom = null; },
      onReportClick: function (e) { if (e.detail === 0) self.openDrawer(e.currentTarget.getAttribute('data-from')); },
      // Tours header, as in the library: refresh spins while it loads; search opens a field over the ribbon with Cancel.
      onRefreshTours: function () {
        clearTimeout(self._refreshTimer);
        self.setState({ toursRefreshing: true });
        self._refreshTimer = setTimeout(function () { self.setState({ toursRefreshing: false }); }, 1200);
      },
      // The cursor goes straight into the field, as in the phone's own search: the library's SearchField autoFocus (Nov 12).
      onOpenTourSearch: function () { self.setState({ tourSearching: true }); },
      onTourQuery: function (v) { self.setState({ tourQuery: v && v.target ? v.target.value : (v || '') }); },
      onClearTourQuery: function () { self.setState({ tourQuery: '' }); },
      onCancelTourSearch: function () { self.setState({ tourSearching: false, tourQuery: '' }); },

      onCloseDrawer: function () { self.setState({ screen: self.state.preDrawerScreen || 'shift' }); },
      onDrawerEmergency: function () { self.holdEmergency(); },
      onDrawerIncident: function () { self.openReport(self.state.reportFrom); },
      onDrawerHistory: function () {
        var back = self.state.preDrawerScreen;
        if (!back || back === 'reports' || back === 'drawer') back = 'shift';
        self.setState({ screen: 'reports', prevScreen: back, reportsMode: 'history', collapsed: {} });
      },
      onReleaseEmergency: function () {
        clearInterval(self._emergencyTimer);
        self._emergencyTimer = null;
        self.setState({ emergencyActive: false });
      },

      onCancelNote: function () { self.setState({ screen: self.state.prevScreen || 'shift', attachMenuOpen: false }); },
      onNoteTap: function () { if (!self.state.keyboardOpen) self.setState({ keyboardOpen: true, attachMenuOpen: false }); },
      onHideKeyboard: function () { self.setState({ keyboardOpen: false, dictating: false }); },
      onDictate: function () {
        if (self.state.dictating) { self.setState({ dictating: false }); return; }
        var cur = (self.state.noteText || '').trim();
        self.setState({ dictating: true, noteText: (cur ? cur + ' ' + self.DICTATED : self.DICTATED).slice(0, 2000) }, function () { self.measureNote(); });
      },
      onNoteChange: function (v) { self.setState({ noteText: (typeof v === 'string' ? v : (v && v.target ? v.target.value : '')).slice(0, 2000) }, function () { self.measureNote(); }); },
      onToggleAttachMenu: function (e) { if (e && e.currentTarget) self._addTile = e.currentTarget; var open = !self.state.attachMenuOpen; self.setState({ attachMenuOpen: open, attachMenuPos: open ? self.attachMenuPos() : self.state.attachMenuPos }); },
      rootRef: function (el) { self._root = el; },
      addTileRef: function (el) {
        self._addTile = el; self._anchor.current = el;
        if (el && self.state.attachMenuOpen && !self.state.attachMenuPos) requestAnimationFrame(function () { self.setState({ attachMenuPos: self.attachMenuPos() }); });
      },
      onCloseAttachMenu: function () { self.setState({ attachMenuOpen: false }); },
      onAttachPick: function (key) { if (key === 'video') self.h.onPickVideo(); else if (key === 'library') self.h.onPickLibrary(); else self.h.onPickCamera(); },
      onPickLibrary: function () { self.addAttachment('photo'); },
      onPickCamera: function () { self.addAttachment('photo'); },
      onPickVideo: function () { self.addAttachment('photo'); },
      onToggleAttention: function (checked) { self.setState({ requiresAttention: !!checked }); },
      onFlipAttention: function () { self.setState({ requiresAttention: !self.state.requiresAttention }); },
      onSubmit: function () { self.submitReport(); },

      onOpenDetails: function () {
        self.setState({ screen: 'details', attachMenuOpen: false, pendingCleared: false, pendingCheckpoint: self.state.checkpoint, pendingWhen: Object.assign({}, self.state.when || self.DEFAULT_WHEN), checkpointSheetOpen: false, timeOpen: false, dateOpen: false });
      },
      onCancelDetails: function () { self.setState({ screen: 'note', checkpointSheetOpen: false, timeOpen: false, dateOpen: false }); },
      onSaveDetails: function () {
        self.setState({ checkpoint: self.state.pendingCheckpoint, when: self.state.pendingWhen, screen: 'note', checkpointSheetOpen: false, timeOpen: false, dateOpen: false });
      },
      onOpenCheckpointSheet: function () { if (!self.noSite()) self.setState({ checkpointSheetOpen: true, timeOpen: false, dateOpen: false }); },
      onCloseCheckpointSheet: function () { self.setState({ checkpointSheetOpen: false }); },
      onPickCheckpoint: function (v) { var none = v == null || v === 'No checkpoint'; self.setState({ pendingCheckpoint: none ? null : v, pendingCleared: none }); },
      onRemovePhoto: function (i) {
        // AttachmentGrid passes the photo's index; attachments may also hold files.
        var a = self.state.attachments.slice(), n = -1;
        for (var k = 0; k < a.length; k++) { if (a[k].kind === 'photo' || a[k].kind === 'video') { n++; if (n === i) { a.splice(k, 1); break; } } }
        self.setState({ attachments: a });
      },
      onToggleTime: function () {
        var w = self.state.pendingWhen || self.DEFAULT_WHEN;
        self.setState({ timeOpen: !self.state.timeOpen, dateOpen: false, tpHour: w.hour, tpMin: w.min, tpMer: w.mer });
      },
      onClosePickers: function () { self.setState({ dateOpen: false, timeOpen: false }); },
      onToggleDate: function () { self.setState({ dateOpen: !self.state.dateOpen, timeOpen: false }); },
      onWheelScroll: function (e) {
        var el = e.currentTarget;
        var col = el.getAttribute('data-col');
        clearTimeout(self._wheelTimers[col]);
        self._wheelTimers[col] = setTimeout(function () { self.setWheel(col, Math.round(el.scrollTop / 36)); }, 110);
      },
      onWheelTap: function (e) {
        var col = e.currentTarget.getAttribute('data-col');
        var idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        var el = self._wheels[col];
        if (el) el.scrollTo({ top: idx * 36, behavior: 'smooth' });
        self.setWheel(col, idx);
      },
      onCloseViewer: function () { self.setState({ viewer: null }); },
      viewerPagerRef: function (el) {
        self._pager = el;
        if (el && self.state.viewer) { var go = function () { el.scrollLeft = self.state.viewer.index * el.clientWidth; }; go(); requestAnimationFrame(go); }
      },
      onViewerScroll: function (e) {
        var el = e.currentTarget;
        clearTimeout(self._pagerTimer);
        self._pagerTimer = setTimeout(function () { if (el.clientWidth) self.goViewer(Math.round(el.scrollLeft / el.clientWidth), false); }, 90);
      },
      hourWheelRef: function (el) { self.setWheelRef('hour', el); },
      minWheelRef: function (el) { self.setWheelRef('min', el); },
      merWheelRef: function (el) { self.setWheelRef('mer', el); },

      onOpenReports: function () { self.setState({ prevScreen: self.state.screen, screen: 'reports', reportsMode: 'shift', collapsed: {} }); },
      onNavChange: function (key) {
        if (key === 'dashboard') self.setState({ screen: 'shift', attachMenuOpen: false });
        if (key === 'schedule') self.setState({ screen: 'schedule', attachMenuOpen: false });
      },
      onBackToSchedule: function () { self.setState({ screen: 'schedule' }); },
      onOpenShiftDetailReports: function () { self.setState({ prevScreen: 'shiftDetail', screen: 'reports', reportsMode: 'pastShift', collapsed: {} }); },
      onBackFromReports: function () {
        var back = self.state.prevScreen;
        if (!back || back === 'reports' || back === 'drawer' || back === 'report' || back === 'note') back = 'shift';
        self.setState({ screen: back });
      },
      onOpenReportDetail: function () { self.setState({ screen: 'report', viewing: null, justSubmitted: false, expanded: {} }); },
      onBackFromReport: function () { self.leaveReport(); },
      onDoneReport: function () { self.leaveReport(); },
      onDismissBanner: function () { self.setState({ bannerDismissed: true }); },
      onAddFollowUp: function () {
        var vr = self.state.viewing ? self.state.past.filter(function (x) { return x.id === self.state.viewing; })[0] : self.state.report;
        var n = vr ? (vr.followUps || []).length : 0;
        self.setState({ screen: 'note', prevScreen: 'report', composeMode: 'followup', noteText: '', attachments: [], requiresAttention: false, attachMenuOpen: false, expanded: {}, when: { d: 24, hour: 3, min: 23 + n, mer: 1 } });
      },

      onSimulateSync: function () {
        // Prototype: connection back -> Sending (banner) -> Processing (pill) -> synced.
        clearTimeout(self._phaseTimer);
        var st0 = self.state;
        if (st0.report && st0.synced || st0.viewing) {
          // A synced report with follow-ups saved offline: Sending -> Enhanced report "Updating" (rewritten) -> synced.
          self.setState({ syncPhase: 'sending' });
          self._phaseTimer = setTimeout(function () {
            self.setState({ syncPhase: 'updating' });
            self._phaseTimer = setTimeout(function () {
              var flush = function (r) {
                if (!r || !self.hasQueuedFu(r)) return r;
                var q = r.followUps.filter(function (f) { return f.queued; });
                var last = q[q.length - 1];
                var add = q.map(function (f) { return ' Update at ' + f.time + ': ' + f.text; }).join('');
                // The rewrite can also change the title, category and priority (Q22, Q23). Prototype: only the scripted follow-up carries a rewrite.
                var rw = q.reduce(function (o, f) { return f.rewrite ? Object.assign(o, f.rewrite) : o; }, {});
                return Object.assign({}, r, rw, { enhanced: (r.enhanced || self.ENHANCED) + add, syncedAt: last.time, followUps: r.followUps.map(function (f) { return Object.assign({}, f, { queued: false }); }) });
              };
              self.setState({ syncPhase: null, report: flush(self.state.report), past: self.state.past.map(flush) });
            }, 2000);
          }, 1500);
          return;
        }
        self.setState({ syncPhase: 'sending' });
        self._phaseTimer = setTimeout(function () {
          self.setState({ syncPhase: 'processing' });
          self._phaseTimer = setTimeout(function () { self.setState({ synced: true, syncPhase: null }); }, 2000);
        }, 1500);
      },
      onResetPrototype: function () { clearTimeout(self._phaseTimer); clearTimeout(self._toastTimer); clearTimeout(self._coTimer); self.setState(Object.assign(self.initialState(), { checkoutToast: false })); },
      onDismissCheckoutToast: function () { clearTimeout(self._coTimer); self.setState({ checkoutToast: false }); },
      onStageChange: function (stage) {
        var out = stage === 'checkedOut';
        self.setState({ stage: stage, checkedIn: !out, checkoutToast: out });
        clearTimeout(self._coTimer);
        if (out) self._coTimer = setTimeout(function () { self.setState({ checkoutToast: false }); }, 4000);
      }

    };
  }

  initialState() {
    return {
      viewer: null, viewing: null, shiftDetailId: 'mar23', reportsMode: 'history', collapsed: {}, past: JSON.parse(JSON.stringify(this.PAST)), screen: 'shift', checkedIn: true, stage: 'onShift', siteLost: false, prevScreen: 'shift', reportFrom: 'shift', composeMode: 'new',
      noteText: '', attachments: [], requiresAttention: false, checkpoint: null, when: null,
      pendingCheckpoint: null, pendingWhen: null, attachMenuOpen: false, checkpointSheetOpen: false,
      timeOpen: false, dateOpen: false, tpHour: 3, tpMin: 12, tpMer: 1,
      report: null, synced: false, justSubmitted: false, bannerDismissed: false,
      emergencyActive: false, emergencyCount: 3, preDrawerScreen: 'shift', expanded: {},
      tourInfoOpen: true, cpReqDone: false, cpDone: false, keyboardOpen: false, dictating: false, syncPhase: null,
      tourSearching: false, tourQuery: '', toursRefreshing: false
    };
  }

  applyScenario(name) {
    // Highlight boards open the prototype in one state (canvas boards No site, Waiting to upload, Synced report).
    var st = this.state;
    var NOTE = 'Tree came down across the north parking spaces, blocking three bays and the fire lane. Branches are on a parked car.';
    if (name === 'noSite') {
      Object.assign(st, { screen: 'details', siteLost: true, prevScreen: 'shift', reportFrom: 'shift', noteText: 'Side gate chain was cut and the gate is open.', pendingWhen: Object.assign({}, this.DEFAULT_WHEN) });
      return;
    }
    if (name === 'compose') {
      Object.assign(st, { screen: 'note', composeMode: 'new', reportFrom: 'checkpoint', prevScreen: 'checkpoint', noteText: NOTE, requiresAttention: true,
        attachments: [{ kind: 'photo', src: this.PHOTOS[0] }, { kind: 'photo', src: this.PHOTOS[1] }] });
      return;
    }
    var simple = {
      drawer: { screen: 'drawer', preDrawerScreen: 'shift', reportFrom: 'shift' },
      composeEmpty: { screen: 'note', composeMode: 'new', reportFrom: 'shift', prevScreen: 'shift' },
      attach: { screen: 'note', composeMode: 'new', reportFrom: 'shift', prevScreen: 'shift', noteText: NOTE, attachMenuOpen: true },
      details: { screen: 'details', reportFrom: 'shift', prevScreen: 'shift', noteText: NOTE, pendingWhen: Object.assign({}, this.DEFAULT_WHEN) },
      checkpointSheet: { screen: 'details', reportFrom: 'shift', prevScreen: 'shift', noteText: NOTE, pendingWhen: Object.assign({}, this.DEFAULT_WHEN), checkpointSheetOpen: true },
      datePicker: { screen: 'details', reportFrom: 'shift', prevScreen: 'shift', noteText: NOTE, pendingWhen: Object.assign({}, this.DEFAULT_WHEN), dateOpen: true },
      timePicker: { screen: 'details', reportFrom: 'shift', prevScreen: 'shift', noteText: NOTE, pendingWhen: Object.assign({}, this.DEFAULT_WHEN), timeOpen: true, tpHour: 3, tpMin: 12, tpMer: 1 },
      schedule: { screen: 'schedule' }, shiftDetail: { screen: 'shiftDetail', shiftDetailId: 'mar23' },
      shiftDetailReport: { screen: 'details', reportFrom: 'shiftDetail', shiftDetailId: 'mar23', prevScreen: 'shiftDetail', noteText: 'Found the side door to the courtyard unlocked at the end of the shift.', pendingWhen: Object.assign({}, this.DEFAULT_WHEN) },
      scheduleDetails: { screen: 'details', reportFrom: 'schedule', prevScreen: 'schedule', noteText: 'Gate code panel at the staff entrance is not working.', pendingWhen: Object.assign({}, this.DEFAULT_WHEN) },
      tours: { screen: 'tours' }, tourDetails: { screen: 'tourDetails' }, tour: { screen: 'tour' }, checkpoint: { screen: 'checkpoint' },
      emergency: { screen: 'shift', emergencyActive: true, emergencyCount: 2 },
      emergencySent: { screen: 'shift', emergencyActive: true, emergencyCount: 0 },
      checkedOut: { screen: 'shift', checkedIn: false, stage: 'checkedOut', checkoutToast: true }
    };
    if (simple[name]) { Object.assign(st, simple[name]); return; }
    if (['offline', 'synced', 'saved', 'followUp', 'reports', 'shiftReports', 'shiftReportsQueued', 'followUpQueued', 'longNote', 'photoPreview'].indexOf(name) < 0) return;
    Object.assign(st, { checkpoint: 'North Parking Lot', when: { d: 24, hour: 3, min: 5, mer: 1 }, reportFrom: 'shift' });
    var LONG = 'Tree came down across the north parking spaces, blocking three bays and the fire lane. Branches are on a parked car, a grey sedan in bay 14, and its windshield looks cracked. I put cones at both ends of the lane and asked the front desk to send visitors to the south lot until the tree service arrives.';
    var report = { aiTitle: name === 'longNote' ? 'Tree down across north parking lot' : 'Fallen tree blocking north parking', text: name === 'longNote' ? LONG : NOTE, requiresAttention: true, noteNotified: true, line1: this.contextParts().line1, where: 'North Parking Lot', time: '4:05 PM',
      attachments: [{ kind: 'photo', src: this.PHOTOS[0] }, { kind: 'photo', src: this.PHOTOS[1] }], details: this.captureDetails(), followUps: [] };
    if (name === 'synced' || name === 'followUpQueued') {
      st.when = { d: 24, hour: 3, min: 17, mer: 1 };
      report.followUps.push({ text: 'Tree crew arrived and cleared the fire lane. Two parking bays are still blocked until the trunk is removed.', time: '4:17 PM',
        attachments: [{ kind: 'photo', src: this.PHOTOS[2] }], details: this.captureDetails() });
    }
    Object.assign(st, { screen: 'report', report: report, synced: name === 'synced' || name === 'followUpQueued' || name === 'reports' || name === 'shiftReports' || name === 'followUp' || name === 'longNote', justSubmitted: name === 'saved', checkpoint: null, when: null, prevScreen: 'shift' });
    if (name === 'followUpQueued') report.followUps.push({ text: 'A visitor tripped on a branch at the lot entrance and hurt their wrist. First aid given; the lot entrance is now taped off.', time: '4:23 PM', notified: true, queued: true,
      rewrite: { aiTitle: 'Visitor hurt by fallen tree in north parking', category: 'Injury' }, attachments: [{ kind: 'photo', src: this.PHOTOS[2] }], details: this.captureDetails() });
    if (name === 'reports') Object.assign(st, { screen: 'reports', prevScreen: 'shift' });
    if (name === 'shiftReports' || name === 'shiftReportsQueued') Object.assign(st, { screen: 'reports', prevScreen: 'shift', reportsMode: 'shift' });
    if (name === 'photoPreview') Object.assign(st, { synced: true, viewer: { photos: report.attachments.map(function (a) { return a.src; }), index: 0, time: '4:12 PM' } });
    if (name === 'followUp') Object.assign(st, { screen: 'note', composeMode: 'followup', prevScreen: 'report', noteText: 'Tree crew arrived and cleared the fire lane.', attachments: [{ kind: 'photo', src: this.PHOTOS[2] }], when: { d: 24, hour: 3, min: 23, mer: 1 } });
  }

  componentDidUpdate() {
    if (this.state.keyboardOpen && this.state.screen !== 'note') this.setState({ keyboardOpen: false, dictating: false });
    // No auto-sync: a saved report stays waiting until "Simulate sync" (prototype-only control) is tapped, as in the original.
  }

  componentDidMount() {
    var self = this;
    if (this.state.noteText) this.measureNote();
    // A board that opens with the attach menu showing: place it under the Add tile once the grid has drawn.
    if (this.state.attachMenuOpen && !this.state.attachMenuPos) requestAnimationFrame(function () { requestAnimationFrame(function () { self.setState({ attachMenuPos: self.attachMenuPos() }); }); });
  }

  measureNote() {
    // Fit the note field to its text: measure the real content height after each change.
    var self = this;
    setTimeout(function () {
      var el = (self._root || document).querySelector('textarea');
      if (!el) return;
      var prev = el.style.height;
      el.style.height = '0px';
      var h = el.scrollHeight + 2;
      el.style.height = prev;
      if (h !== self.state.noteH) self.setState({ noteH: h });
    }, 30);
  }

  componentWillUnmount() {
    clearTimeout(this._phaseTimer);
    clearInterval(this._libPoll);
    clearInterval(this._emergencyTimer);
    clearTimeout(this._pressTimer);
    clearTimeout(this._syncTimer);
    clearTimeout(this._toastTimer);
  }

  outsideShift() {
    // Started from the Schedule list, or with no shift checked in: nothing comes from a shift.
    var s = this.state;
    return this.noContext() || (!s.checkedIn && s.reportFrom !== 'shiftDetail');
  }

  noContext() {
    // A report started from the Schedule list (not from a shift's details) captures no site, shift or checkpoint.
    return this.state.reportFrom === 'schedule';
  }

  ctxShift() {
    // The shift a report is started from: the shift whose details page is open, else the current shift.
    var s = this.state;
    var id = s.reportFrom === 'shiftDetail' ? s.shiftDetailId : 'mar24';
    return this.SHIFTS.filter(function (x) { return x.id === id; })[0];
  }

  shiftCaptureLabel() {
    var sh = this.ctxShift();
    return sh.current ? sh.time : sh.month + ' ' + sh.day + ' · ' + sh.time;
  }

  noSite() {
    if (this.noContext()) return true;
    if (this.state.reportFrom === 'shiftDetail') return false; // the site comes from that shift
    return this.state.siteLost || !this.state.checkedIn;
  }

  addAttachment(kind) {
    var a = this.state.attachments;
    if (a.length >= 20) return this.setState({ attachMenuOpen: false });
    var nPhotos = a.filter(function (x) { return x.kind === 'photo'; }).length;
    var nFiles = a.length - nPhotos;
    var item = kind === 'photo' ? { kind: 'photo', src: this.PHOTOS[nPhotos % this.PHOTOS.length] } : { kind: 'file', name: this.FILES[nFiles % this.FILES.length] };
    this.setState({ attachMenuOpen: false, attachments: a.concat([item]) });
  }

  setWheel(col, idx) {
    var key = this.COLKEY[col];
    var patch = {};
    patch[key] = idx;
    var w = Object.assign({}, this.state.pendingWhen || this.DEFAULT_WHEN);
    w[col] = idx;
    patch.pendingWhen = w;
    this.setState(patch);
  }

  attachMenuPos() {
    // Below the Add tile; flips above it when there isn't room before the bottom of the screen.
    var root = this._root, tile = this._addTile && this._addTile.isConnected ? this._addTile : (root && root.querySelector('button[aria-label="Add photos and videos"]'));
    if (!root || !tile) return null;
    var rr = root.getBoundingClientRect(), tr = tile.getBoundingClientRect();
    var k = rr.width / 402 || 1, H = 144;
    var left = (tr.left - rr.left) / k, top = (tr.bottom - rr.top) / k + 8;
    if (top + H > 874 - 24) top = (tr.top - rr.top) / k - 8 - H;
    return { left: Math.round(left), top: Math.round(top) };
  }

  openViewer(photos, index, time, date, entry) {
    this.setState({ viewer: { photos: photos, index: index, time: time, date: date || 'Mar 24, 2026', entry: entry } });
  }

  goViewer(index, scroll) {
    var v = this.state.viewer;
    if (!v || index < 0 || index >= v.photos.length) return;
    if (scroll && this._pager) this._pager.scrollTo({ left: index * this._pager.clientWidth, behavior: 'smooth' });
    if (index !== v.index) this.setState({ viewer: Object.assign({}, v, { index: index }) });
  }

  setWheelRef(col, el) {
    this._wheels[col] = el;
    if (el) {
      var idx = this.state[this.COLKEY[col]] || 0;
      var apply = function () { el.scrollTop = idx * 36; };
      apply();
      requestAnimationFrame(apply);
      setTimeout(apply, 60);
    }
  }

  whenLabels(w) {
    w = w || this.DEFAULT_WHEN;
    var time = (w.hour + 1) + ':' + String(w.min).padStart(2, '0') + ' ' + (w.mer === 0 ? 'AM' : 'PM');
    var day = w.d === 24 ? 'Today' : w.d === 23 ? 'Yesterday' : 'Mar ' + w.d;
    return { date: 'Mar ' + w.d + ', 2026', time: time, context: day + ', ' + time };
  }

  openDrawer(from) {
    this.setState({ screen: 'drawer', preDrawerScreen: this.state.screen === 'drawer' ? this.state.preDrawerScreen : this.state.screen, reportFrom: from });
  }

  openReport(from) {
    this.setState({
      screen: 'note', prevScreen: from, reportFrom: from, composeMode: 'new', noteText: '', attachments: [],
      requiresAttention: false, checkpoint: null, when: null, attachMenuOpen: false
    });
  }

  submitReport() {
    var s = this.state;
    if (!s.noteText.trim()) return;
    if (s.composeMode === 'followup' && s.viewing) {
      var fu = { text: s.noteText.trim(), notified: !!s.requiresAttention, queued: true, time: this.whenLabels(s.when).time, attachments: s.attachments.slice(), details: this.captureDetails() };
      var past = s.past.map(function (x) { return x.id === s.viewing ? Object.assign({}, x, { followUps: (x.followUps || []).concat([fu]), requiresAttention: x.requiresAttention || !!s.requiresAttention }) : x; });
      this.setState({ past: past, screen: 'report', expanded: {} });
    } else if (s.composeMode === 'followup' && s.report) {
      var report = Object.assign({}, s.report);
      report.followUps = (report.followUps || []).concat([{ text: s.noteText.trim(), notified: !!s.requiresAttention, queued: !!s.synced, time: this.whenLabels(s.when).time, attachments: s.attachments.slice(), details: this.captureDetails() }]);
      if (s.requiresAttention) report.requiresAttention = true;
      this.setState({ report: report, screen: 'report', expanded: {} });
    } else {
      var ctx = this.contextParts();
      this.setState({
        report: { shiftId: this.noContext() ? null : this.ctxShift().id, text: s.noteText.trim(), requiresAttention: s.requiresAttention, noteNotified: s.requiresAttention, line1: ctx.line1, where: ctx.where, time: this.whenLabels(s.when).time, details: this.captureDetails(), attachments: s.attachments.slice(), followUps: [] },
        screen: 'report', synced: false, justSubmitted: true, bannerDismissed: false, expanded: {}
      });
      var self = this;
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(function () { self.setState({ bannerDismissed: true }); }, 4000);
    }
  }

  leaveReport() {
    var s = this.state;
    if (s.justSubmitted) {
      var from = s.reportFrom;
      this.setState({ expanded: {}, justSubmitted: false, bannerDismissed: false, screen: (!from || from === 'reports') ? 'shift' : from });
    } else {
      this.setState({ screen: 'reports', expanded: {}, viewing: null });
    }
  }

  holdEmergency() {
    var self = this;
    clearInterval(this._emergencyTimer);
    var under = this.state.screen === 'drawer' ? (this.state.preDrawerScreen || 'shift') : this.state.screen;
    this.setState({ emergencyActive: true, screen: under, emergencyCount: 3 });
    this._emergencyTimer = setInterval(function () {
      var n = self.state.emergencyCount - 1;
      if (n <= 0) {
        clearInterval(self._emergencyTimer);
        self._emergencyTimer = null;
        self.setState({ emergencyCount: 0 });
        setTimeout(function () { self.setState({ emergencyActive: false }); }, 1600);
      } else {
        self.setState({ emergencyCount: n });
      }
    }, 900);
  }

  contextParts() {
    var s = this.state;
    var from = s.reportFrom;
    var noSite = this.noSite();
    var tour = (from === 'tour' || from === 'checkpoint') && s.checkedIn ? 'Opening Check' : null;
    var checkpoint = noSite ? null : (s.checkpoint || (from === 'checkpoint' ? 'Front Door' : null));
    var line1;
    if (this.outsideShift()) line1 = 'Started outside a shift';
    else if (noSite) line1 = ['No site captured', tour].filter(Boolean).join(' · ');
    else {
      var sh = this.ctxShift();
      var siteName = sh.site;
      if (!tour && !checkpoint) line1 = siteName + ' · ' + (sh.current ? 'Current shift' : sh.month + ' ' + sh.day + ' shift');
      else line1 = [siteName, tour, checkpoint].filter(Boolean).join(' · ');
    }
    var where = noSite ? 'No site' : (checkpoint || (tour ? tour : this.ctxShift().site));
    return { line1: line1, line2: this.whenLabels(s.when).context, tour: tour || 'None', where: where };
  }

  captureDetails() {
    // Snapshot of the submission details at the moment the report is saved (read-only on the report).
    var s = this.state;
    var noSite = this.noSite();
    var ctx = this.contextParts();
    var w = this.whenLabels(s.when);
    var out = this.outsideShift();
    var cp = out ? 'Not available outside a shift' : noSite ? 'Not available without a site' : (s.checkpoint || (s.reportFrom === 'checkpoint' ? 'Front Door' : 'No checkpoint'));
    var list = [
      { icon: 'map-location-dot', label: 'Site', value: out ? 'Started outside a shift' : noSite ? 'Not captured' : this.ctxShift().site },
      { icon: 'calendar-day', label: 'Shift', value: out ? 'Started outside a shift' : this.shiftCaptureLabel() },
      { icon: 'route', label: 'Tour', value: out ? 'Started outside a shift' : ctx.tour === 'None' ? 'Started outside a tour' : ctx.tour },
      { icon: 'location-dot', label: 'Checkpoint', value: cp },
      { icon: 'clock', label: 'Occurrence time', value: w.date + ' · ' + w.time },
      { icon: 'location-crosshairs', label: 'Captured location', value: '49.2827° N, 123.1207° W' }
    ];
    return list.map(function (d, i) { return Object.assign(d, { divider: i < list.length - 1 }); });
  }

  reportByline(report) {
    // Original note's captured details in the byline, as in the original: "site · shift · tour · checkpoint" then "date · time" (no author: the guard is signed in and sees only their own reports). Anything not captured is left out.
    var skip = ['', 'None', 'Not captured', 'Not detected', 'No active shift', 'No checkpoint', 'Not available without a site', 'Not available outside a shift', 'Started outside a shift', 'Started outside a tour'];
    var ctx = [], when = '';
    (report.details || []).forEach(function (d) {
      if (d.label === 'Occurrence time') when = d.value || '';
      else if (['Site', 'Shift', 'Tour', 'Checkpoint'].indexOf(d.label) >= 0 && skip.indexOf(d.value) < 0) ctx.push(d.value);
    });
    if (!when) when = (report.date || 'Mar 24, 2026') + ' · ' + (report.filedAt || '4:12 PM');
    return (ctx.length ? ctx.join(' · ') + '\n' : '') + when;
  }

  submissionVals(report, synced) {
    var self = this;
    var subs = [{ key: 'note', icon: 'file-lines', title: 'Original note', time: report.filedAt || '4:12 PM', text: report.text, attachments: report.attachments || [], details: report.details || [], notified: report.noteNotified !== undefined ? !!report.noteNotified : !!report.requiresAttention }];
    (report.followUps || []).forEach(function (fu, i) { subs.push({ key: 'fu' + i, icon: 'comment', title: 'Follow-up ' + (i + 1), time: fu.time, text: fu.text, attachments: fu.attachments || [], details: fu.details || [], notified: !!fu.notified, queued: !!fu.queued }); });
    return subs.map(function (sb, i) {
      var photos = sb.attachments.filter(function (a) { return a.kind === 'photo'; });
      var files = sb.attachments.filter(function (a) { return a.kind === 'file'; });
      var get = function (label) { var d = sb.details.filter(function (x) { return x.label === label; })[0]; return d ? d.value : ''; };
      var cp = get('Checkpoint');
      var when = get('Occurrence time').split(' · ')[1] || '';
      var open = !!self.state.expanded['d' + sb.key];
      return {
        queued: !!sb.queued, before: sb.queued && DS && React ? React.createElement(DS.StatusPill, { status: 'queued' }) : null, showHeader: i === 1, icon: sb.icon, title: sb.title, time: sb.time, text: sb.text, more: self.moreFor(sb.key, sb.text),
        hasPhotos: photos.length > 0, photos: photos.map(function (a, k) { return { src: a.src, label: 'Open photo ' + (k + 1) + ' of ' + photos.length, open: function () { self.openViewer(photos.map(function (x) { return x.src; }), k, sb.time, report.date, sb.title); } }; }),
        hasFiles: files.length > 0, files: files.map(function (a, k) { return { name: a.name, divider: k < files.length - 1 }; }),
        hasDetails: false, details: sb.details, detailsOpen: open, bandBottom: open ? 0 : -16, detailsIcon: open ? 'chevron-up' : 'chevron-down',
        summary: [cp && cp !== 'None' && cp.indexOf('Not available') !== 0 ? cp : (get('Site') === 'Not detected' || get('Site') === 'Not captured' || get('Site') === 'Started outside a shift' ? 'No site' : get('Site')), when].filter(Boolean).join(' · '),
        toggleDetails: function () { var e = Object.assign({}, self.state.expanded); e['d' + sb.key] = !e['d' + sb.key]; self.setState({ expanded: e }); }
      };
    });
  }

  aiTitle(report) {
    // The title is the AI headline, generated after sync (decision 3/4). Prototype: a mock headline, else the note's first phrase.
    if (report.aiTitle) return report.aiTitle;
    var t = (report.text || '').split(/[.,;!?\n]/)[0].trim().split(/\s+/).slice(0, 7).join(' ');
    return t ? t.charAt(0).toUpperCase() + t.slice(1) : 'Incident report';
  }

  shiftRows(sh, onDashboard) {
    // The library's shift details rows (Dashboard and Shift details), in its order; the Reports row is this prototype's.
    var self = this, s = this.state;
    var t = sh.time.split(' - ');
    var live = !!sh.current, done = !live && sh.status === 'worked';
    var checkIn = live ? (s.checkedIn || s.stage === 'checkedOut' ? t[0] : '-') : done ? t[0] : '-';
    var checkOut = live ? (s.checkedIn ? '-' : '4:52 PM') : done ? t[1] : '-';
    var n = this.shiftReports(sh.id).length;
    return [
      { icon: 'folder', label: 'Documents', count: 4, chevron: true },
      { icon: 'route', label: 'Tours', count: 2, chevron: true, open: function () { self.setState({ screen: 'tours', tourFrom: onDashboard ? 'shift' : 'shiftDetail' }); } },
      { icon: 'clipboard', label: 'Reports', count: n || null, chevron: true, open: onDashboard ? function () { self.setState({ prevScreen: 'shift', screen: 'reports', reportsMode: 'shift', collapsed: {} }); } : function () { self.setState({ prevScreen: 'shiftDetail', screen: 'reports', reportsMode: live ? 'shift' : 'pastShift', collapsed: {} }); } },
      { icon: 'calendar-days', label: 'Shift date', value: sh.dateNum },
      { icon: 'clock', label: 'Scheduled start time', value: t[0] },
      { icon: 'clock', label: 'Scheduled end time', value: t[1] },
      { icon: 'utensils', label: 'Scheduled break duration', value: '0.00' },
      { icon: 'hourglass-end', label: 'Scheduled shift total', value: sh.total },
      { icon: 'building-user', label: 'Customer', value: sh.customer },
      { icon: 'map', label: 'Site', value: sh.site },
      { icon: 'suitcase', label: 'Service', value: 'Security guard' },
      { icon: 'tag', label: 'Shift tag', value: '-' },
      { icon: 'location-dot', label: 'Location', value: sh.site },
      { icon: 'rectangle-list', label: 'Note', value: '-' },
      { icon: 'clock', label: 'Check-in time', value: checkIn, chevron: true },
      { icon: 'clock', label: 'Check-out time', value: checkOut, chevron: true },
      { icon: 'user', label: 'Break duration', value: '0.00' },
      { icon: 'hourglass-end', label: 'Shift total', value: done ? sh.total : '-', chevron: true }
    ];
  }

  hasQueuedFu(report) {
    return !!report && (report.followUps || []).some(function (f) { return f.queued; });
  }

  reportPills(report, synced) {
    // Waiting: "Queued" on the device; "Processing" once sent, while the AI writes the title, category and Enhanced report.
    if (!synced) return [this.state.syncPhase === 'processing' ? { label: 'Processing', tone: 'neutral', icon: '' } : { label: 'Queued', tone: 'warning', icon: '' }];
    var cat = report.category || 'Safety hazard', pr = report.priority || 'High';
    var out = [{ label: cat, tone: 'info', icon: '' }, pr === 'High' ? { label: 'High priority', tone: 'alert', icon: '' } : { label: pr, tone: 'neutral', icon: '' }];
    if (this.hasQueuedFu(report)) out.push({ label: 'Queued', tone: 'warning', icon: '' });
    return out;
  }

  reportCard(report, synced, viewingId) {
    var self = this;
    var nAtt = (report.attachments || []).length + (report.followUps || []).reduce(function (n, f) { return n + (f.attachments || []).length; }, 0);
    var nFu = (report.followUps || []).length;
    return {
      pills: this.reportPills(report, synced), time: report.filedAt || '4:12 PM', hasTitle: !!synced, title: synced ? this.aiTitle(report) : '', cardTitle: synced ? this.aiTitle(report) : undefined, text: report.text,
      meta: this.reportContextMeta(report).concat(nAtt ? [nAtt + (nAtt === 1 ? ' attachment' : ' attachments')] : [], nFu ? [nFu + (nFu === 1 ? ' follow-up' : ' follow-ups')] : []).join(' · '),
      open: function () { self.setState({ screen: 'report', viewing: viewingId, justSubmitted: false, expanded: {} }); }
    };
  }

  reportOnShift(id) {
    // Which shift the in-session report belongs to: the one it was started from (none when started from the Schedule list).
    var r = this.state.report;
    if (!r) return false;
    if (r.shiftId !== undefined) return r.shiftId === id;
    return id === 'mar24';
  }

  shiftReports(id) {
    var list = (this.state.past || []).filter(function (p) { return p.shiftId === id; });
    if (this.reportOnShift(id)) list = [this.state.report].concat(list);
    return list;
  }

  reportGroups() {
    // Shift reports (dashboard row): only this shift. Report history (action sheet): last 30 days, grouped by day.
    var self = this, s = this.state;
    var cur = s.report ? [{ day: 'Today', card: this.reportCard(s.report, s.synced, null) }] : [];
    var pastRows = (s.past || []).map(function (p) { return { day: p.day, shiftId: p.shiftId, card: self.reportCard(p, true, p.id) }; });
    var shiftId = s.reportsMode === 'shift' ? 'mar24' : s.shiftDetailId;
    var rows = s.reportsMode === 'history' ? cur.concat(pastRows)
      : (this.reportOnShift(shiftId) ? cur : []).concat(pastRows.filter(function (r) { return r.shiftId === shiftId; }));
    var sh = this.SHIFTS.filter(function (x) { return x.id === shiftId; })[0];
    var shiftLabel = shiftId === 'mar24' ? 'Today · ' + sh.time : sh.weekday.charAt(0) + sh.weekday.slice(1).toLowerCase() + ', ' + sh.month + ' ' + sh.day + ' · ' + sh.time;
    var groups = [];
    rows.forEach(function (row) {
      var label = s.reportsMode === 'history' ? row.day : shiftLabel;
      var g = groups.filter(function (x) { return x.label === label; })[0];
      if (!g) { g = { label: label, items: [] }; groups.push(g); }
      g.items.push(row.card);
    });
    return groups.map(function (g) {
      var open = !(s.collapsed || {})[g.label];
      return { label: g.label, count: g.items.length, items: g.items, open: open,
        toggle: function () { var c = Object.assign({}, self.state.collapsed); c[g.label] = open; self.setState({ collapsed: c }); } };
    });
  }

  reportContextMeta(report) {
    var get = function (label) { var d = (report.details || []).filter(function (x) { return x.label === label; })[0]; return d ? d.value : ''; };
    var site = get('Site');
    site = !site || site === 'Not detected' || site === 'Not captured' || site === 'No site' || site === 'Started outside a shift' ? 'No site' : site;
    // Filed on a tour → "Site · Tour · Checkpoint"; otherwise → "Site · <shift date, time>". No word "Shift" (shifts have no names).
    var ok = function (v) { return v && v !== 'None' && v !== '—' && v.indexOf('Not ') !== 0 && v.indexOf('No ') !== 0 && v.indexOf('Started ') !== 0; };
    var tour = get('Tour'), cp = get('Checkpoint');
    if (ok(tour)) return [site, tour].concat(ok(cp) ? [cp] : []);
    var shiftId = report.shiftId === undefined ? 'mar24' : report.shiftId;
    var sh = shiftId ? this.SHIFTS.filter(function (x) { return x.id === shiftId; })[0] : null;
    return [site].concat(sh ? [sh.month + ' ' + sh.day + ', ' + sh.time] : []);
  }

  moreFor(key, text) {
    // Long text shows 3 lines with Show more / Show less (pattern from the managers' Activity log).
    var self = this;
    var long = (text || '').length > 150;
    var open = !!this.state.expanded[key];
    return { long: long, open: open, lines: long && !open ? 3 : 'unset', label: open ? 'Show less' : 'Show more', icon: open ? 'chevron-up' : 'chevron-down',
      toggle: function () { var e = Object.assign({}, self.state.expanded); e[key] = !e[key]; self.setState({ expanded: e }); } };
  }

  render() {
    const v = this.renderVals();
    return (<div ref={v.rootRef} style={{ position: "relative", width: "402px", height: "874px", overflow: "hidden", display: "flex", flexDirection: "column", background: "var(--cx-bg)", fontFamily: "var(--font-body)", color: "#000" }}>

<DS.StatusBar time={v.clock} background={v.statusBg} color={v.statusInk} />

{v.isEmergency && (<>
<div style={{ flex: "1", minHeight: "0", display: "flex", flexDirection: "column", alignItems: "center", background: "var(--cx-error-strong)", color: "#fff", textAlign: "center", padding: "40px 30px 0" }}>
<div style={{ fontWeight: "500", fontSize: "12px", lineHeight: "14px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Emergency alert</div>
{v.emergencyDone && (<><div style={{ fontWeight: "700", fontSize: "24px", lineHeight: "30px", marginTop: "12px" }}>Alert sent to your supervisor</div></>)}
{v.notEmergencyDone && (<><div style={{ fontWeight: "700", fontSize: "24px", lineHeight: "30px", marginTop: "12px" }}>Keep holding to alert your supervisor</div></>)}
<div style={{ position: "relative", width: "210px", height: "210px", marginTop: "48px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.12)" }}>
<svg width="210" height="210" viewBox="0 0 210 210" aria-hidden="true" style={{ position: "absolute", inset: "0", transform: "rotate(-90deg)" }}><circle cx="105" cy="105" r="98" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="8"></circle><circle cx="105" cy="105" r="98" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" strokeDasharray="616" strokeDashoffset={v.emergencyDashOffset} style={{ transition: "stroke-dashoffset 0.9s linear" }}></circle></svg>
{v.notEmergencyDone && (<><span style={{ fontWeight: "700", fontSize: "64px", lineHeight: "64px" }}>{v.emergencyCount}</span></>)}
{v.emergencyDone && (<><DS.Icon name="check" size={v.n56} color="#fff" /></>)}
</div>
<div style={{ marginTop: "40px", fontWeight: "300", fontSize: "16px", lineHeight: "24px", whiteSpace: "pre-line" }}>{v.emergencyContext}</div>
{v.notEmergencyDone && (<>
<div style={{ marginTop: "auto", width: "100%", padding: "0 0 40px" }}>
<DS.Button variant="outlined" fullWidth={v.yes} onClick={v.onReleaseEmergency}>Release to cancel</DS.Button>
</div>
</>)}
</div>
</>)}

{v.isNotEmergency && (<>

{v.isShift && (<>
<div data-from="shift" onPointerDown={v.onReportDown} onPointerUp={v.onReportUp} onPointerLeave={v.onReportLeave} style={{ flex: "none" }}>
<DS.PageHeader title="Dashboard" leftIcon="circle-question" actions={v.hdrActions.shift} />
</div>
{v.checkedIn && (<>
<DS.TabRibbon tabs={v.dashTabs} value="Current" stretch={v.yes} {...v.dashRibbon} />
<div style={{ flex: "none", textAlign: "center", padding: "14px 0 0" }}>
<div style={{ fontWeight: "400", fontSize: "20px", lineHeight: "25px", color: "#000" }}>March 24, 2026</div>
<div style={{ fontWeight: "300", fontSize: "16px", lineHeight: "25px", color: "#000", marginTop: "4px" }}>4:12 PM - 11:12 PM</div>
<div style={{ marginTop: "12px" }}>
<DS.ShiftActions stage={v.stage} onStageChange={v.onStageChange} />
</div>
<div style={{ marginTop: "14px" }}>
<DS.SubTabs tabs={v.shiftTabs} value="Details" />
</div>
</div>
<div style={{ scrollbarWidth: "none", flex: "1 1 0%", minHeight: "0", overflowY: "auto", background: "#fff" }}>
{(v.dashRows || []).map((r, rIdx) => (<React.Fragment key={rIdx}><DS.ListRow icon={r.icon} label={r.label} value={r.value} count={r.count} chevron={r.chevron} onClick={r.open} /></React.Fragment>))}
<div style={{ display: "flex", gap: "10px", padding: "16px", background: "var(--cx-bg)" }}><DS.Button variant="outlined" icon="signal-stream" fullWidth={v.yes}>Scan to start</DS.Button><DS.Button icon="play" fullWidth={v.yes} onClick={v.goTour}>Start tour</DS.Button></div>
</div>
</>)}
{v.notCheckedIn && (<>
<DS.TabRibbon tabs={v.dashTabs} value="Current" stretch={v.yes} {...v.dashRibbon} />
<div style={{ scrollbarWidth: "none", flex: "1 1 0%", minHeight: "0", overflowY: "auto" }}>
<div style={{ textAlign: "center", padding: "30px 0 0", fontWeight: "400", fontSize: "20px", lineHeight: "25px", color: "#000" }}>March 24, 2026</div>
<DS.EmptyState message="You have no shifts scheduled up to 03/25/26 8:00 AM." actions={v.offShiftActions} {...v.emptyTop} />
</div>
<DS.PrototypeControl text="Not part of the app" action="Reset prototype" actionIcon="rotate-left" onAction={v.onResetPrototype} {...v.protoTop} />
</>)}
<DS.BottomNav active="dashboard" badges={v.navBadges} onChange={v.onNavChange} />
</>)}

{v.isTours && (<>
<div data-from="tours" onPointerDown={v.onReportDown} onPointerUp={v.onReportUp} onPointerLeave={v.onReportLeave} style={{ flex: "none" }}>
<DS.PageHeader title="Tours" onBack={v.onToursBack} actions={v.hdrActions.tours} />
</div>
{v.tourSearching && (<>
<div style={{ display: "flex", alignItems: "center", gap: "4px", height: "52px", padding: "0 4px 0 16px", boxSizing: "border-box", flex: "none" }}>
<DS.SearchField height={v.n36} placeholder="Search tours" autoFocus={v.yes} value={v.tourQuery} onChange={v.onTourQuery} onClear={v.tourClear} {...v.fill1} />
<DS.Button variant="text" size="md" onClick={v.onCancelTourSearch}>Cancel</DS.Button>
</div>
</>)}
{v.tourRibbonShown && (<>
<DS.TabRibbon tabs={v.tourTabs} value="All" trailing={v.tourSearchBtn} gutter={v.n16} />
</>)}
<div style={{ scrollbarWidth: "none", flex: "1 1 0%", minHeight: "0", overflowY: "auto", padding: "0 16px 16px", display: "grid", gap: "10px", alignContent: "start" }}>
{v.showOpeningTour && (<>
<DS.SectionHeader label="Scheduled" count={v.n1} />
<DS.TourCard title="Opening Check" meta="4:30 PM • 3 checkpoints" status="upcoming" action="Start" onAction={v.goTour} onOpen={v.goTourDetails} />
</>)}
{v.showPerimeterTour && (<>
<DS.SectionHeader label="Unscheduled" count={v.n1} />
<DS.TourCard title="Perimeter Sweep" meta="Available anytime • 4 checkpoints" status="available" action="Start" />
</>)}
{v.noToursMatch && (<><div style={{ padding: "40px 8px", textAlign: "center", fontWeight: "300", fontSize: "14px", lineHeight: "20px", color: "var(--cx-mono-80)" }}>{v.noToursText}</div></>)}
</div>
<DS.BottomNav active={v.tourNavTab} badges={v.navBadges} onChange={v.onNavChange} />
</>)}

{v.isTourDetails && (<>
<div data-from="tourDetails" onPointerDown={v.onReportDown} onPointerUp={v.onReportUp} onPointerLeave={v.onReportLeave} style={{ flex: "none" }}>
<DS.PageHeader title="Tour details" onBack={v.goTours} actions={v.hdrActions.tourDetails} />
</div>
<DS.SubHeader title="Opening Check" subtitle="Police Museum" />
<div style={{ scrollbarWidth: "none", flex: "1 1 0%", minHeight: "0", overflowY: "auto", padding: "10px 16px 16px" }}>
<DS.InfoCard title="Description" rows={v.tourInfoRows} footnote="Checkpoints must be scanned in order.">Check the main entrance, reception and courtyard before the museum opens.</DS.InfoCard>
<DS.SectionHeader label="Checkpoints" count={v.n3} />
<DS.ListContainer>
<DS.CheckpointRow index={v.n1} title="Front Door" subtitle="Main access" />
<DS.CheckpointRow index={v.n2} title="Reception" subtitle="Ground floor" />
<DS.CheckpointRow index={v.n3} title="Courtyard" subtitle="Exterior" {...v.lastRowProps} />
</DS.ListContainer>
</div>
<DS.FooterActions>
<DS.Button icon="play" fullWidth={v.yes} onClick={v.goTour}>Start tour</DS.Button>
</DS.FooterActions>
<DS.BottomNav active={v.tourNavTab} badges={v.navBadges} onChange={v.onNavChange} />
</>)}

{v.isTour && (<>
<div data-from="tour" onPointerDown={v.onReportDown} onPointerUp={v.onReportUp} onPointerLeave={v.onReportLeave} style={{ flex: "none" }}>
<DS.PageHeader title="Opening Check" onBack={v.goTours} actions={v.hdrActions.tour} />
</div>
<div style={{ flex: "none", padding: "16px 16px 8px" }}>
<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontWeight: "500", fontSize: "14px", color: "var(--cx-mono-80)" }}><span>{v.tourProgressLabel}</span><span>{v.tourProgressPct}</span></div>
<DS.ProgressBar value={v.tourProgress} />
</div>
<div style={{ scrollbarWidth: "none", flex: "1 1 0%", minHeight: "0", overflowY: "auto", padding: "0 16px 16px" }}>
<DS.SectionHeader label="Tour details" count={v.n1} open={v.tourInfoOpen} onToggle={v.toggleTourInfo} />
{v.tourInfoOpen && (<><DS.InfoCard title="Description" rows={v.tourInfoRows} footnote="Checkpoints must be scanned in order.">Check the main entrance, reception and courtyard before the museum opens.</DS.InfoCard></>)}
<DS.SectionHeader label="Checkpoints • 3 total" collapsible={v.no} />
<div style={{ display: "grid", gap: "10px" }}>
{v.cpNotDone && (<>
<DS.CheckpointRow card={v.yes} state="available" title="Front Door" subtitle="Main access" onClick={v.goCheckpoint} />
<DS.CheckpointRow card={v.yes} index={v.n2} title="Reception" subtitle="Available after Front Door" />
</>)}
{v.cpDone && (<>
<DS.CheckpointRow card={v.yes} state="completed" title="Front Door" subtitle="Main access" time="4:14 PM" />
<DS.CheckpointRow card={v.yes} state="available" title="Reception" subtitle="Ground floor" />
</>)}
<DS.CheckpointRow card={v.yes} index={v.n3} title="Courtyard" subtitle="Available after Reception" />
</div>
</div>
<DS.FooterActions>
<DS.Button variant="outlined" fullWidth={v.yes} onClick={v.goShift}>End tour</DS.Button>
<DS.Button icon="signal-stream" fullWidth={v.yes} onClick={v.onScan}>Scan</DS.Button>
</DS.FooterActions>
<DS.BottomNav active={v.tourNavTab} badges={v.navBadges} onChange={v.onNavChange} />
</>)}

{v.isCheckpoint && (<>
<div data-from="checkpoint" onPointerDown={v.onReportDown} onPointerUp={v.onReportUp} onPointerLeave={v.onReportLeave} style={{ flex: "none" }}>
<DS.PageHeader title="Checkpoint details" subtitle="Opening Check tour" onBack={v.goTour} actions={v.hdrActions.checkpoint} />
</div>
<DS.SubHeader title="Front Door" subtitle="Main access" />
<div style={{ scrollbarWidth: "none", flex: "1 1 0%", minHeight: "0", overflowY: "auto", padding: "10px 16px 16px" }}>
<div>
<DS.InfoCard title="Description">Public front entrance.</DS.InfoCard>
<DS.SectionHeader label="Checkpoint requirements" count={v.reqCount} />
<DS.RequirementCard icon="clipboard-list-check" title="Instructions" description="Confirm the door is secure before moving on." action="Mark as done" actionIcon="circle" completed={v.cpReqDone} onAction={v.onMarkDone} />
</div>
</div>
<DS.FooterActions>
<DS.Button fullWidth={v.yes} disabled={v.cpReqNotDone} onClick={v.onCompleteCheckpoint}>{v.completeLabel}</DS.Button>
</DS.FooterActions>
<DS.BottomNav active={v.tourNavTab} badges={v.navBadges} onChange={v.onNavChange} />
</>)}

{v.isNote && (<>
<DS.PageHeader title={v.composeTitle} onBack={v.onCancelNote} />
<div style={{ flex: "none", display: "flex", alignItems: "center", minHeight: "64px", padding: "8px 4px 8px 0", boxSizing: "border-box", borderBottom: "1px solid var(--cx-mono-30)" }}>
<div style={{ width: "48px", flex: "none", display: "flex", justifyContent: "center" }}><DS.Icon name={v.contextIcon} size={v.n20} color={v.contextIconColor} /></div>
<div style={{ flex: "1", minWidth: "0" }}>
<div style={{ fontWeight: "400", fontSize: "14px", lineHeight: "20px", letterSpacing: "0.3px", color: "#000" }}>{v.contextLine1}</div>
<div style={{ fontWeight: "300", fontSize: "14px", lineHeight: "20px", letterSpacing: "0.3px", color: "#000" }}>{v.contextLine2}</div>
</div>
<DS.Button variant="text" icon="pen" size="md" onClick={v.onOpenDetails}>Edit</DS.Button>
</div>
<div style={{ scrollbarWidth: "none", position: "relative", flex: "1 1 0%", minHeight: "0", overflowY: "auto", padding: "16px 16px 16px" }}>
<DS.FormField label="What happened?" count={v.noteCount}>
<div onClick={v.onNoteTap}><DS.TextArea value={v.noteText} placeholder="Describe the incident" height={v.noteHeight} onChange={v.onNoteChange} /></div>
</DS.FormField>
<DS.AttachmentGrid items={v.photoItems} max={v.n20} onAdd={v.onToggleAttachMenu} onRemove={v.onRemovePhoto} menuOpen={v.attachMenuOpen} menuId="attach-menu" addRef={v.addTileRef} {...v.gridTop} />
{v.hasFiles && (<>
<div style={{ marginTop: "16px" }}>
<DS.ListContainer radius={v.n8}>
{(v.fileItems || []).map((f, fIdx) => (<React.Fragment key={fIdx}>
<DS.FileRow name={f.name} kind="pdf" divider={f.divider} onRemove={f.remove} />
</React.Fragment>))}
</DS.ListContainer>
</div>
</>)}
</div>
<div style={{ display: "flex", alignItems: "center", gap: "12px", flex: "none", padding: "12px 16px", borderTop: "1px solid var(--cx-mono-30)", background: "var(--cx-bg)" }}>
<DS.Icon name="bell" size={v.n20} color={v.notifyInk} />
<div style={{ flex: "1", minWidth: "0" }}><div style={{ fontWeight: "500", fontSize: "14px", lineHeight: "18px", color: "#000" }}>Notify supervisor now</div></div>
<DS.Toggle checked={v.requiresAttention} label="Notify supervisor now" onChange={v.onToggleAttention} />
</div>
<DS.FooterActions>
<DS.Button variant="outlined" fullWidth={v.yes} onClick={v.onCancelNote}>Cancel</DS.Button>
<DS.Button fullWidth={v.yes} disabled={v.cannotSubmit} onClick={v.onSubmit}>Save</DS.Button>
</DS.FooterActions>
{v.showKeyboard && (<>
<DS.Keyboard onReturn={v.onHideKeyboard} onDictate={v.onDictate} dictating={v.dictating} />
</>)}
{v.hideKeyboard && (<>
<div style={{ height: "34px", flex: "none", position: "relative", background: "var(--cx-bg)" }}><div style={{ position: "absolute", left: "50%", bottom: "8px", marginLeft: "-60px", width: "120px", height: "4px", borderRadius: "3px", background: "#000" }}></div></div>
</>)}
</>)}

{v.isDetails && (<>
{v.pickerOpen && (<><div onClick={v.onClosePickers} style={{ position: "absolute", inset: "0", zIndex: "25" }}></div></>)}
<DS.PageHeader title="Incident details" onBack={v.onCancelDetails} />
<div style={{ scrollbarWidth: "none", flex: "1 1 0%", minHeight: "0", overflowY: "auto" }}>
<DS.ListRow icon="map-location-dot" iconVariant="regular" label="Site" detail={v.siteText} trailing={v.sitePill} {...v.lockedRow} />
<DS.ListRow icon="calendar-day" iconVariant="regular" label="Shift" detail={v.shiftText} trailing={v.shiftPill} {...v.lockedRow} />
<DS.ListRow icon="route" iconVariant="regular" label="Tour" detail={v.tourDisplay} trailing={v.tourPill} {...v.lockedRow} />
<div style={{ display: "flex", alignItems: "center", padding: "12px 15px 14px 0", borderBottom: "1px solid var(--cx-mono-30)" }}>
<div style={{ width: "48px", flex: "none", display: "flex", justifyContent: "center" }}><DS.Icon name="location-dot" variant="regular" size={v.n20} color="var(--cx-mono-80)" /></div>
<div style={{ flex: "1", minWidth: "0" }}>
<div style={{ fontWeight: "400", fontSize: "14px", lineHeight: "20px", letterSpacing: "0.3px", color: "#000", marginBottom: "8px" }}>Checkpoint</div>
<DS.Select value={v.pendingCheckpointDisplay} placeholder={v.checkpointPlaceholder} disabled={v.noSite} onChange={v.onOpenCheckpointSheet} />
</div>
</div>
<div style={{ display: "flex", alignItems: "center", padding: "12px 15px 14px 0", borderBottom: "1px solid var(--cx-mono-30)" }}>
<div style={{ width: "48px", flex: "none", display: "flex", justifyContent: "center" }}><DS.Icon name="clock" variant="regular" size={v.n20} color="var(--cx-mono-80)" /></div>
<div style={{ flex: "1", minWidth: "0" }}>
<div style={{ position: "relative", display: "flex", alignItems: "center", gap: "8px" }}>
<span style={{ flex: "1", fontWeight: "400", fontSize: "14px", lineHeight: "20px", letterSpacing: "0.3px", color: "#000" }}>Occurrence time</span>
<button type="button" onClick={v.onToggleDate} aria-expanded={v.dateOpen} style={{ height: "34px", padding: "0 11px", border: "none", borderRadius: "8px", background: "rgba(120,120,128,0.12)", fontFamily: "-apple-system, var(--font-body)", fontSize: "17px", color: v.dateChipInk, cursor: "pointer" }}>{v.whenDateLabel}</button>
<button type="button" onClick={v.onToggleTime} aria-expanded={v.timeOpen} style={{ height: "34px", padding: "0 11px", border: "none", borderRadius: "8px", background: "rgba(120,120,128,0.12)", fontFamily: "-apple-system, var(--font-body)", fontSize: "17px", color: v.timeChipInk, cursor: "pointer" }}>{v.whenTimeLabel}</button>
{v.dateOpen && (<>
<div role="dialog" aria-label="Choose date" style={{ position: "absolute", zIndex: "30", bottom: "calc(100% + 8px)", borderRadius: "13px", background: "#f4f4f6", boxShadow: "0 10px 40px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.06)", left: "-40px", right: "-2px", padding: "14px 14px 10px" }}>
<div style={{ display: "flex", alignItems: "center", padding: "0 4px 12px" }}><span style={{ flex: "1", display: "flex", alignItems: "center", gap: "6px", fontFamily: "-apple-system, var(--font-body)", fontWeight: "600", fontSize: "17px", color: "#000" }}>March 2026<DS.Icon name="chevron-right" size={v.n12} color="#007AFF" /></span><span style={{ display: "flex", gap: "22px", paddingRight: "6px" }}><DS.Icon name="chevron-left" size={v.n18} color="#007AFF" /><DS.Icon name="chevron-right" size={v.n18} color="#007AFF" /></span></div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", rowGap: "2px", textAlign: "center" }}>
{(v.weekdayLabels || []).map((w, wIdx) => (<React.Fragment key={wIdx}><span style={{ fontFamily: "-apple-system, var(--font-body)", fontWeight: "600", fontSize: "13px", lineHeight: "24px", color: "rgba(60,60,67,0.3)" }}>{w}</span></React.Fragment>))}
{(v.calendarCells || []).map((c, cIdx) => (<React.Fragment key={cIdx}><button type="button" onClick={c.pick} disabled={c.disabled} aria-label={c.aria} style={{ justifySelf: "center", width: "40px", height: "40px", border: "none", borderRadius: "50%", padding: "0", background: c.bg, fontFamily: "-apple-system, var(--font-body)", fontWeight: c.weight, fontSize: "19px", color: c.ink, cursor: "pointer", visibility: c.visibility }}>{c.label}</button></React.Fragment>))}
</div>
</div>
</>)}
{v.timeOpen && (<>
<div role="dialog" aria-label="Choose time" style={{ position: "absolute", zIndex: "30", bottom: "calc(100% + 8px)", borderRadius: "13px", background: "#f4f4f6", boxShadow: "0 10px 40px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.06)", right: "0", width: "264px", padding: "12px 16px" }}>
<div style={{ position: "absolute", left: "12px", right: "12px", top: "84px", height: "36px", borderRadius: "8px", background: "rgba(120,120,128,0.12)", pointerEvents: "none" }}></div>
<div style={{ display: "flex", justifyContent: "center" }}>
<div style={{ boxSizing: "border-box", height: "180px", overflowY: "auto", scrollSnapType: "y mandatory", padding: "72px 0", scrollbarWidth: "none", WebkitMaskImage: "linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)", maskImage: "linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)", width: "64px" }} ref={v.hourWheelRef} data-col="hour" onScroll={v.onWheelScroll}>
{(v.hourOptions || []).map((h, hIdx) => (<React.Fragment key={hIdx}><div data-col="hour" data-idx={h.idx} onClick={v.onWheelTap} style={{ height: "36px", display: "flex", alignItems: "center", justifyContent: "center", scrollSnapAlign: "center", fontFamily: "-apple-system, var(--font-body)", fontSize: "21px", color: "#000", cursor: "pointer" }}>{h.label}</div></React.Fragment>))}
</div>
<div style={{ boxSizing: "border-box", height: "180px", overflowY: "auto", scrollSnapType: "y mandatory", padding: "72px 0", scrollbarWidth: "none", WebkitMaskImage: "linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)", maskImage: "linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)", width: "64px" }} ref={v.minWheelRef} data-col="min" onScroll={v.onWheelScroll}>
{(v.minOptions || []).map((m, mIdx) => (<React.Fragment key={mIdx}><div data-col="min" data-idx={m.idx} onClick={v.onWheelTap} style={{ height: "36px", display: "flex", alignItems: "center", justifyContent: "center", scrollSnapAlign: "center", fontFamily: "-apple-system, var(--font-body)", fontSize: "21px", color: "#000", cursor: "pointer" }}>{m.label}</div></React.Fragment>))}
</div>
<div style={{ boxSizing: "border-box", height: "180px", overflowY: "auto", scrollSnapType: "y mandatory", padding: "72px 0", scrollbarWidth: "none", WebkitMaskImage: "linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)", maskImage: "linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)", width: "64px" }} ref={v.merWheelRef} data-col="mer" onScroll={v.onWheelScroll}>
{(v.merOptions || []).map((p, pIdx) => (<React.Fragment key={pIdx}><div data-col="mer" data-idx={p.idx} onClick={v.onWheelTap} style={{ height: "36px", display: "flex", alignItems: "center", justifyContent: "center", scrollSnapAlign: "center", fontFamily: "-apple-system, var(--font-body)", fontSize: "21px", color: "#000", cursor: "pointer" }}>{p.label}</div></React.Fragment>))}
</div>
</div>
</div>
</>)}
</div>
<div style={{ marginTop: "6px", fontWeight: "400", fontSize: "12px", lineHeight: "14px", color: "#000" }}>Originally captured: Today, 4:12 PM</div>
</div>
</div>
<DS.ListRow icon="location-crosshairs" iconVariant="regular" label="Captured location" detail="49.2827° N, 123.1207° W · where the report was started" trailing={v.locPill} {...v.lockedRow} />
</div>
<DS.FooterActions>
<DS.Button variant="outlined" fullWidth={v.yes} onClick={v.onCancelDetails}>Cancel</DS.Button>
<DS.Button fullWidth={v.yes} onClick={v.onSaveDetails}>Save</DS.Button>
</DS.FooterActions>
<div style={{ height: "34px", flex: "none", position: "relative", background: "var(--cx-bg)" }}><div style={{ position: "absolute", left: "50%", bottom: "8px", marginLeft: "-60px", width: "120px", height: "4px", borderRadius: "3px", background: "#000" }}></div></div>
{v.checkpointSheetOpen && (<>
<div><DS.SelectSheet title="Checkpoint" groups={v.checkpointGroups} value={v.checkpointSheetValue} noneOption="No checkpoint" searchPlaceholder="Search checkpoints" onChange={v.onPickCheckpoint} onClose={v.onCloseCheckpointSheet} /></div>
</>)}
</>)}

{v.isSchedule && (<>
<div data-from="schedule" onPointerDown={v.onReportDown} onPointerUp={v.onReportUp} onPointerLeave={v.onReportLeave} style={{ flex: "none" }}>
<DS.PageHeader title="Schedule" leftIcon="circle-question" actions={v.hdrActions.schedule} />
</div>
<DS.DateHeader label="March 2026" />
<div style={{ scrollbarWidth: "none", flex: "1 1 0%", minHeight: "0", overflowY: "auto", padding: "4px 16px 16px", display: "grid", gap: "10px", alignContent: "start" }}>
{(v.scheduleShifts || []).map((sh, shIdx) => (<React.Fragment key={shIdx}><DS.ShiftCard weekday={sh.weekday} month={sh.month} day={sh.day} time={sh.time} lines={sh.lines} status={sh.status} onClick={sh.open} /></React.Fragment>))}
</div>
<DS.BottomNav active="schedule" badges={v.navBadges} onChange={v.onNavChange} />
</>)}

{v.isShiftDetail && (<>
<div data-from="shiftDetail" onPointerDown={v.onReportDown} onPointerUp={v.onReportUp} onPointerLeave={v.onReportLeave} style={{ flex: "none" }}>
<DS.PageHeader title="Shift details" onBack={v.onBackToSchedule} actions={v.hdrActions.shiftDetail} />
</div>
<div style={{ flex: "none", textAlign: "center", padding: "14px 0 0" }}>
<div style={{ fontWeight: "400", fontSize: "20px", lineHeight: "25px", color: "#000" }}>{v.sd.date}</div>
<div style={{ fontWeight: "300", fontSize: "16px", lineHeight: "25px", color: "#000", marginTop: "4px" }}>{v.sd.time}</div>
{v.sd.current && (<><div style={{ marginTop: "12px" }}><DS.ShiftActions stage={v.stage} onStageChange={v.onStageChange} /></div></>)}
<div style={{ marginTop: "14px" }}>
<DS.SubTabs tabs={v.detailTabs} value="Details" />
</div>
</div>
<div style={{ scrollbarWidth: "none", flex: "1 1 0%", minHeight: "0", overflowY: "auto", background: "#fff" }}>
{(v.sdRows || []).map((r, rIdx) => (<React.Fragment key={rIdx}><DS.ListRow icon={r.icon} label={r.label} value={r.value} count={r.count} chevron={r.chevron} onClick={r.open} /></React.Fragment>))}
</div>
<DS.FooterActions>
<DS.Button variant="outlined" icon="signal-stream" fullWidth={v.yes}>Scan to start</DS.Button>
<DS.Button icon="play" fullWidth={v.yes} onClick={v.goTourFromDetail}>Start tour</DS.Button>
</DS.FooterActions>
<DS.BottomNav active="schedule" badges={v.navBadges} onChange={v.onNavChange} />
</>)}

{v.isReports && (<>
<div data-from="reports" onPointerDown={v.onReportDown} onPointerUp={v.onReportUp} onPointerLeave={v.onReportLeave} style={{ flex: "none" }}>
<DS.PageHeader title={v.reportsTitle} onBack={v.onBackFromReports} actions={v.hdrActions.reports} />
</div>
<div style={{ scrollbarWidth: "none", flex: "1 1 0%", minHeight: "0", overflowY: "auto", padding: "0 16px 16px" }}>
{(v.reportGroups || []).map((g, gIdx) => (<React.Fragment key={gIdx}>
<DS.SectionHeader label={g.label} count={g.count} open={g.open} onToggle={g.toggle} />
{g.open && (<>
<div style={{ display: "grid", gap: "10px", paddingBottom: "6px" }}>
{(g.items || []).map((it, itIdx) => (<React.Fragment key={itIdx}>
<DS.ReportCard pills={it.pills} time={it.time} title={it.cardTitle} text={it.text} meta={it.meta} onClick={it.open} />
</React.Fragment>))}
</div>
</>)}
</React.Fragment>))}
{v.reportsEmpty && (<><DS.EmptyState message={v.reportsEmptyText} /></>)}
{v.isHistory && (<><div style={{ padding: "16px 0 4px", textAlign: "center", fontWeight: "300", fontSize: "12px", lineHeight: "16px", color: "var(--cx-mono-80)" }}>Showing reports from the last 30 days</div></>)}
</div>
{v.showSimSync && (<>
<DS.PrototypeControl text="The report waits until you sync it" action="Simulate sync" actionIcon="rotate" onAction={v.onSimulateSync} {...v.protoSync} />
</>)}
<DS.BottomNav active="dashboard" badges={v.navBadges} onChange={v.onNavChange} />
</>)}

{v.isReportDetail && (<>
<DS.PageHeader title="Incident report" onBack={v.onBackFromReport} />
<div style={{ scrollbarWidth: "none", flex: "1 1 0%", minHeight: "0", overflowY: "auto" }}>
<div style={{ padding: "16px 16px 0" }}>
{v.synced && (<>
<div style={{ fontWeight: "400", fontSize: "20px", lineHeight: "25px", color: "#000" }}>{v.reportTitle}</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" }}>
{(v.detailPills || []).map((pl, plIdx) => (<React.Fragment key={plIdx}><DS.StatusPill label={pl.label} tone={pl.tone} icon={pl.icon} /></React.Fragment>))}
</div>
</>)}
{v.notSynced && (<>
<div style={{ display: "flex", gap: "6px" }}>
<DS.StatusPill label={v.waitPill.label} tone={v.waitPill.tone} icon={v.waitPill.icon} />
</div>
</>)}
{v.reportRequiresAttention && (<>
<div style={{ marginTop: "12px" }}><DS.InlineNotice tone="success" icon="bell" compact={v.yes}>{v.notifiedText}</DS.InlineNotice></div>
</>)}
{v.notifyPending && (<>
<div style={{ marginTop: "12px" }}><DS.InlineNotice tone="warning" icon="clock" compact={v.yes}>Supervisor notification pending</DS.InlineNotice></div>
</>)}
<div style={{ marginTop: "12px", fontWeight: "400", fontSize: "12px", lineHeight: "18px", color: "var(--cx-mono-90)", whiteSpace: "pre-line" }}>{v.reportByline}</div>
</div>
<div style={{ padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
{v.synced && (<>
<DS.InfoCard icon="sparkles" tone="info" title="Enhanced report" text={v.enhancedText} clamp={v.n3} before={v.enhBefore} />
</>)}
{v.notSynced && (<>
<DS.InfoCard icon="sparkles" tone="info" title="Enhanced report" loading={v.yes} text={v.enhWaitingCopy} />
</>)}
{(v.submissions || []).map((sub, subIdx) => (<React.Fragment key={subIdx}>
{sub.showHeader && (<><DS.SectionHeader label="Follow-ups" count={v.followUpCount} collapsible={v.no} /></>)}
<DS.InfoCard icon={v.nul} title={sub.title} time={sub.time} text={sub.text} clamp={v.n3} before={sub.before}>
{sub.hasPhotos && (<><span style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px" }}>{(sub.photos || []).map((ph, phIdx) => (<React.Fragment key={phIdx}><button type="button" aria-label={ph.label} onClick={ph.open} style={{ display: "block", padding: "0", border: "none", background: "none", borderRadius: "8px", cursor: "zoom-in" }}><DS.AttachmentThumb src={ph.src} size={v.n58} /></button></React.Fragment>))}</span></>)}
{sub.hasFiles && (<><span style={{ display: "block", marginTop: "12px" }}><DS.ListContainer radius={v.n8}>{(sub.files || []).map((f, fIdx) => (<React.Fragment key={fIdx}><DS.FileRow name={f.name} kind="pdf" divider={f.divider} /></React.Fragment>))}</DS.ListContainer></span></>)}
{sub.hasDetails && (<><button type="button" onClick={sub.toggleDetails} aria-expanded={sub.detailsOpen} style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "12px", padding: "0", border: "none", background: "none", fontFamily: "var(--font-body)", fontWeight: "400", fontSize: "12px", lineHeight: "14px", color: "var(--cx-mono-90)", cursor: "pointer" }}>Details<DS.Icon name={sub.detailsIcon} size={v.n12} color="var(--cx-mono-80)" /></button>
{sub.detailsOpen && (<><span style={{ display: "grid", rowGap: "8px", marginTop: "10px" }}>{(sub.details || []).map((dt, dtIdx) => (<React.Fragment key={dtIdx}><span style={{ display: "block", fontSize: "14px", lineHeight: "22px", color: "#000" }}><span style={{ fontWeight: "500" }}>{dt.label}:</span> <span style={{ fontWeight: "300" }}>{dt.value}</span></span></React.Fragment>))}</span></>)}</>)}
</DS.InfoCard>
</React.Fragment>))}
</div>
</div>
{v.showSimSync && (<>
<DS.PrototypeControl text="The report waits until you sync it" action="Simulate sync" actionIcon="rotate" onAction={v.onSimulateSync} {...v.protoSync} />
</>)}
<div style={{ flex: "none", padding: "10px 16px 8px", background: "var(--cx-bg)", borderTop: "1px solid var(--cx-mono-30)" }}><DS.InlineNotice tone={v.syncBannerTone} icon={v.syncBannerIcon} variant="line">{v.syncBannerText}</DS.InlineNotice></div>
<DS.FooterActions>
<DS.Button variant="outlined" fullWidth={v.yes} onClick={v.onAddFollowUp}>Add follow-up</DS.Button>
<DS.Button fullWidth={v.yes} onClick={v.onDoneReport}>Done</DS.Button>
</DS.FooterActions>
<DS.BottomNav active="dashboard" badges={v.navBadges} onChange={v.onNavChange} />
{v.showSubmitBanner && (<>
<div role="status" style={{ position: "absolute", top: "0", left: "0", right: "0", zIndex: "15", background: "var(--cx-success-dark)", boxShadow: "var(--shadow-popup)" }}>
<DS.StatusBar time="4:19" background="var(--cx-success-dark)" color="#fff" />
<DS.Toast tone="success" title="Report saved" onClose={v.onDismissBanner} {...v.toastPopover} />
</div>
</>)}
</>)}

{v.isDrawer && (<>
<div style={{ position: "absolute", inset: "0", zIndex: "20" }}><DS.ActionSheet title="Start an action" actions={v.drawerActions} onClose={v.onCloseDrawer} /></div>
</>)}

</>)}

{v.showCheckoutToast && (<>
<div role="status" style={{ position: "absolute", top: "0", left: "0", right: "0", zIndex: "15", background: "var(--cx-success-dark)", boxShadow: "var(--shadow-popup)" }}>
<DS.StatusBar time="4:52" background="var(--cx-success-dark)" color="#fff" />
<DS.Toast tone="success" title="Checked out at 4:52 PM" onClose={v.onDismissCheckoutToast} {...v.toastPopover} />
</div>
</>)}
{/* iOS attach menu: drawn at screen level so it sits above the notify row and footer */}
<DS.AttachMenu open={v.attachMenuOpen} anchor={v.addAnchor} id="attach-menu" onSelect={v.onAttachPick} onClose={v.onCloseAttachMenu} />

{v.viewerOpen && (<>
<div role="dialog" aria-modal="true" aria-label="Photo preview" style={{ position: "absolute", top: "56px", left: "0", right: "0", bottom: "0", zIndex: "60", display: "flex", flexDirection: "column", background: "#000", color: "#fff", fontFamily: "-apple-system, 'SF Pro Text', var(--font-body)" }}>
<div style={{ height: "52px", flex: "none", display: "grid", gridTemplateColumns: "76px 1fr 76px", alignItems: "center", padding: "0 8px" }}>
<button type="button" onClick={v.onCloseViewer} style={{ justifySelf: "start", padding: "8px", border: "none", background: "none", fontFamily: "inherit", fontSize: "17px", lineHeight: "22px", color: "#0a84ff", cursor: "pointer" }}>Done</button>
<div style={{ textAlign: "center", fontWeight: "600", fontSize: "17px", lineHeight: "22px" }}>{v.viewerTitle}</div>
<span></span>
</div>
<div ref={v.viewerPagerRef} onScroll={v.onViewerScroll} style={{ flex: "1 1 0%", minHeight: "0", display: "flex", overflowX: "auto", overflowY: "hidden", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}>
{(v.viewerPhotos || []).map((vp, vpIdx) => (<React.Fragment key={vpIdx}><div style={{ flex: "0 0 100%", height: "100%", scrollSnapAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}><div role="img" aria-label={vp.alt} style={{ width: "100%", height: "100%", background: `url("${vp.src}") center / contain no-repeat` }}></div></div></React.Fragment>))}
</div>
<div style={{ flex: "none", padding: "14px 24px 0", textAlign: "center", fontSize: "14px", lineHeight: "20px", color: "rgba(255,255,255,0.8)" }}>{v.viewerCaption}<br /><span style={{ color: "rgba(235,235,245,0.6)" }}>{v.viewerMeta}</span></div>
{v.viewerMany && (<>
<div style={{ flex: "none", display: "flex", justifyContent: "center", alignItems: "center", gap: "3px", padding: "14px 0 6px" }}>
{(v.viewerPhotos || []).map((vp, vpIdx) => (<React.Fragment key={vpIdx}><button type="button" aria-label={vp.label} aria-current={vp.current} onClick={vp.go} style={{ width: `${vp.w}px`, height: "40px", padding: "0", border: "none", borderRadius: "3px", overflow: "hidden", background: "#1c1c1e", opacity: vp.opacity, outline: vp.outline, outlineOffset: "1px", transition: "width 0.15s ease", cursor: "pointer" }}><span style={{ display: "block", width: "100%", height: "100%", background: `url("${vp.src}") center / cover no-repeat` }}></span></button></React.Fragment>))}
</div>
</>)}
<div style={{ height: "34px", flex: "none", position: "relative" }}><div style={{ position: "absolute", left: "50%", bottom: "8px", marginLeft: "-60px", width: "120px", height: "4px", borderRadius: "3px", background: "#fff" }}></div></div>
</div>
</>)}
</div>
    );
  }

  renderVals() {
    var self = this;
    var s = this.state;
    var ctx = this.contextParts();
    var noSite = this.noSite();
    var cur = s.report || { text: '', requiresAttention: false, attachments: [], followUps: [] };
    var viewed = s.viewing ? (s.past || []).filter(function (x) { return x.id === s.viewing; })[0] || null : null;
    var report = viewed || cur;
    var dSynced = viewed ? true : s.synced;
    var syncedAt = viewed ? viewed.syncedAt : (cur.syncedAt || '4:19 PM');
    var fuQueued = dSynced && this.hasQueuedFu(report);
    var fuNotifyPending = fuQueued && report.followUps.some(function (f) { return f.queued && f.notified; });
    var scr = s.screen === 'drawer' ? (s.preDrawerScreen || 'shift') : s.screen; // the action sheet opens over the screen it came from
    var DSX = DS, h = React && React.createElement;
    var pillEl = function (pp) { return DSX && h ? h(DSX.StatusPill, pp) : null; };
    var tq = (s.tourQuery || '').trim().toLowerCase();
    var tourMatch = function (t) { return !tq || t.toLowerCase().indexOf(tq) >= 0; };
    var isReportDetail = s.screen === 'report';
    var reportTitle = this.aiTitle(report);
    var atts = report.attachments || [];
    var nAtt = atts.length + (report.followUps || []).reduce(function (n, f) { return n + (f.attachments || []).length; }, 0);
    var nFu = (report.followUps || []).length;
    var photos = s.attachments.map(function (a, i) { return { a: a, i: i }; }).filter(function (x) { return x.a.kind === 'photo'; });
    var files = s.attachments.map(function (a, i) { return { a: a, i: i }; }).filter(function (x) { return x.a.kind === 'file'; });
    var removeAt = function (i) { return function () { var a = self.state.attachments.slice(); a.splice(i, 1); self.setState({ attachments: a }); }; };
    var rPhotos = atts.filter(function (a) { return a.kind === 'photo'; });
    var rFiles = atts.filter(function (a) { return a.kind === 'file'; });
    var pw = s.pendingWhen || s.when || this.DEFAULT_WHEN;
    var pl = this.whenLabels(pw);
    var pendingCp = noSite ? '' : (s.pendingCheckpoint || (s.reportFrom === 'checkpoint' && !s.pendingCleared ? 'Front Door' : ''));
    var cells = [];
    for (var d = 1; d <= 31; d++) cells.push({ label: String(d), day: d });
    cells = cells.map(function (c) {
      if (c.blank) return { label: '', disabled: true, visibility: 'hidden', bg: 'transparent', ink: '#000', weight: 400, aria: '', pick: null };
      var sel = c.day === pw.d;
      var future = c.day > 24;
      return {
        label: c.label, disabled: future, visibility: 'visible', aria: 'March ' + c.day + (future ? ', unavailable' : ''),
        bg: sel ? '#007AFF' : 'transparent',
        ink: sel ? '#fff' : future ? 'rgba(60,60,67,0.3)' : c.day === 24 ? '#007AFF' : '#000',
        weight: sel || c.day === 24 ? 600 : 400,
        pick: function () { var w = Object.assign({}, self.state.pendingWhen || self.DEFAULT_WHEN); w.d = c.day; self.setState({ pendingWhen: w }); }
      };
    });
    return Object.assign({}, this.h, {
      yes: true, no: false,
      n0: 0, n16: 16, n36: 36, nul: null, n48: 48, n1: 1, n2: 2, n3: 3, n4: 4, n8: 8, n12: 12, n14: 14, n18: 18, n20: 20, n56: 56, n58: 58, n160: 160,
      clock: s.screen === 'report' ? '4:19' : (s.checkedIn ? '4:12' : '4:53'),
      statusBg: s.viewer ? '#000' : s.emergencyActive ? 'var(--cx-error-strong)' : 'var(--cx-bg)',
      statusInk: s.viewer || s.emergencyActive ? '#fff' : '#000',
      viewerOpen: !!s.viewer,
      viewerMany: !!s.viewer && s.viewer.photos.length > 1,
      viewerTitle: s.viewer ? 'Photo ' + (s.viewer.index + 1) + ' of ' + s.viewer.photos.length : '',
      viewerCaption: s.viewer ? (dSynced ? reportTitle : 'Incident report') : '',
      viewerMeta: s.viewer ? (s.viewer.date || 'Mar 24, 2026') + ' · ' + s.viewer.time : '',
      viewerPhotos: s.viewer ? s.viewer.photos.map(function (src, k) {
        var cur = k === s.viewer.index;
        return { src: src, alt: 'Photo ' + (k + 1), label: 'Show photo ' + (k + 1), current: cur ? 'true' : 'false', w: cur ? 40 : 28, opacity: cur ? 1 : 0.55, outline: cur ? '2px solid #fff' : 'none',
          go: function () { self.goViewer(k, true); } };
      }) : [],
      navBadges: { dashboard: 2, chat: 2 },
      shiftTabs: ['Details', 'Map', 'Activities', 'Log'],
      detailTabs: ['Details', 'Status', 'Map', 'Activities'],
      dashRows: this.shiftRows(this.SHIFTS[3], true),
      sdRows: this.shiftRows(this.SHIFTS.filter(function (x) { return x.id === s.shiftDetailId; })[0] || this.SHIFTS[2], false),
      tourTabs: ['All', 'In progress', 'Unscheduled', 'Completed'],
      dashTabs: ['0 Missing', 'Current', '1 Upcoming'],
      tourNavTab: s.tourFrom === 'shiftDetail' ? 'schedule' : 'dashboard',
      // Header actions (library PageHeader actions: 44px tap areas 8px apart, title centred). The clipboard is plain, with the
      // grey disc only while its action sheet is open. Tap (mouse, finger or keyboard) opens the sheet on click; a long press is timed on the
      // header's wrapper (onReportDown) and opens a new incident, and the click that follows it is skipped.
      hdrActions: (function () {
        var rep = function (from) { return { icon: 'clipboard-list', label: 'Report', pressed: s.screen === 'drawer', onClick: function (e) {
          if (e && e.detail !== 0 && self._pressFired) { self._pressFired = false; return; }
          self.openDrawer(from);
        } }; };
        var o = {};
        ['tourDetails', 'tour', 'checkpoint', 'schedule', 'shiftDetail', 'reports'].forEach(function (f) { o[f] = [rep(f)]; });
        o.shift = [{ icon: 'bell', label: 'Notifications' }, rep('shift')];
        o.tours = [{ icon: 'arrows-rotate', label: 'Refresh', spinning: !!s.toursRefreshing, onClick: self.h.onRefreshTours }, rep('tours')];
        return o;
      })(),
      tourSearching: !!s.tourSearching,
      tourRibbonShown: !s.tourSearching,
      tourQuery: s.tourQuery || '',
      tourClear: s.tourQuery ? self.h.onClearTourQuery : undefined,
      tourSearchBtn: (DS && React) ? React.createElement(DS.IconButton, { icon: 'magnifying-glass', size: 44, iconSize: 20, label: 'Search tours', onClick: self.h.onOpenTourSearch }) : null,
      tourRibbon: { style: { paddingTop: 10, paddingBottom: 10, paddingLeft: 16 } },
      fill1: { style: { flex: 1 } },
      showOpeningTour: tourMatch('Opening Check'),
      showPerimeterTour: tourMatch('Perimeter Sweep'),
      noToursMatch: !tourMatch('Opening Check') && !tourMatch('Perimeter Sweep'),
      noToursText: 'No tours match \u201c' + (s.tourQuery || '').trim() + '\u201d',
      dashRibbon: { style: { height: 56, padding: '14px 19px 10px' } },
      emptyTop: { style: { paddingTop: 40 } },
      checkpointGroups: this.CHECKPOINT_GROUPS,
      attachmentCountLabel: (s.attachments || []).length + ' of 20 attachments',
      checkpointSheetValue: pendingCp || null,
      notifyBg: s.requiresAttention ? 'var(--cx-error-alert-bg, #fbeceb)' : '#fff',
      notifyBorder: s.requiresAttention ? 'var(--cx-error-alt)' : 'var(--cx-subtle-border)',
      notifyDisc: s.requiresAttention ? '#fff' : 'var(--cx-error-alert-bg, #fbeceb)',
      notifyInk: s.requiresAttention ? 'var(--cx-error-alt)' : 'var(--cx-mono-80)',
      notifyHint: s.requiresAttention ? 'Your supervisor gets an alert as soon as you save.' : 'Turn on for anything that needs action now.',
      ribbonGutter: { style: { padding: '10px 16px' } },
      thumbFill: { style: { width: '100%', height: 'auto', aspectRatio: '1' } },
      notifiedNotice: { style: { background: 'var(--cx-success-light)' } },
      enhancedCard: { style: { border: '1px solid var(--cx-info-soft)' } },
      detailRow: { style: { background: 'transparent' } },
      lockedRow: { style: { padding: '12px 15px 14px 0', background: 'transparent' } },
      attachButton: { style: { height: 46 } },
      toastPopover: { style: { paddingTop: 0, minHeight: 96, boxShadow: 'none' } },
      syncBanner: { style: { borderRadius: 0, padding: '0', border: 'none', background: 'transparent' } },

      isEmergency: s.emergencyActive,
      isNotEmergency: !s.emergencyActive,
      isShift: scr === 'shift',
      isSchedule: scr === 'schedule',
      isShiftDetail: scr === 'shiftDetail',
      scheduleShifts: this.SHIFTS.map(function (sh) {
        var n = self.shiftReports(sh.id).length;
        var st = sh.current ? (s.checkedIn ? 'scheduled' : 'worked') : sh.status; // the app has two shift statuses: Worked and Scheduled
        return { weekday: sh.weekday, month: sh.month, day: sh.day, time: sh.time, status: st,
          lines: [sh.site].concat(n ? [n + (n === 1 ? ' incident report' : ' incident reports')] : []),
          open: function () { self.setState({ screen: 'shiftDetail', shiftDetailId: sh.id }); } };
      }),
      sd: (function () {
        var sh = self.SHIFTS.filter(function (x) { return x.id === s.shiftDetailId; })[0] || self.SHIFTS[2];
        return Object.assign({}, sh, { hasStatus: !!sh.status, reportsCount: self.shiftReports(sh.id).length || null });
      })(),
      isTours: scr === 'tours',
      isTour: scr === 'tour',
      isCheckpoint: scr === 'checkpoint',
      isTourDetails: scr === 'tourDetails',
      tourInfoOpen: s.tourInfoOpen,
      tourInfoRows: [{ label: 'Tour schedule', value: 'Scheduled' }, { label: 'Tour route order', value: 'Fixed' }],
      lastRowProps: { style: { borderBottom: 'none' } },
      cpDone: s.cpDone, cpNotDone: !s.cpDone, cpReqDone: s.cpReqDone || s.cpDone, cpReqNotDone: !(s.cpReqDone || s.cpDone),
      tourProgress: s.cpDone ? 33 : 0, tourProgressLabel: (s.cpDone ? 1 : 0) + '/3', tourProgressPct: (s.cpDone ? 33 : 0) + ' %',
      reqCount: ((s.cpReqDone || s.cpDone) ? 1 : 0) + ' / 1',
      completeLabel: 'Completed ' + ((s.cpReqDone || s.cpDone) ? 1 : 0) + ' / 1',
      isNote: s.screen === 'note',
      isDetails: s.screen === 'details',
      isReports: scr === 'reports',
      isReportDetail: isReportDetail,
      showKeyboard: !!s.keyboardOpen && scr === 'note' && !s.attachMenuOpen,
      hideKeyboard: !(s.keyboardOpen && scr === 'note' && !s.attachMenuOpen),
      dictating: !!s.dictating,
      micBg: s.dictating ? '#fff' : 'transparent',
      micInk: s.dictating ? 'var(--cx-primary)' : '#676767',
      showSimSync: !s.syncPhase && ((!!s.report && !s.synced && (scr === 'reports' || (scr === 'report' && !s.viewing))) || (scr === 'report' && fuQueued) || (scr === 'reports' && (this.hasQueuedFu(s.report) || s.past.some(function (x) { return self.hasQueuedFu(x); })))),
      isDrawer: s.screen === 'drawer',

      checkedIn: s.checkedIn,
      notCheckedIn: !s.checkedIn,
      stage: s.stage === 'checkedOut' ? 'onShift' : s.stage,
      reportsCount: this.shiftReports('mar24').length || null,

      emergencyCount: s.emergencyCount,
      emergencyDone: s.emergencyCount <= 0,
      notEmergencyDone: s.emergencyCount > 0,
      emergencyDashOffset: 616 - (3 - Math.max(s.emergencyCount, 0)) * (616 / 3),
      emergencyContext: ctx.line1 + '\nYour location and shift are attached.',

      composeTitle: s.composeMode === 'followup' ? 'Add follow-up' : 'New incident',
      contextLine1: ctx.line1,
      contextLine2: ctx.line2,
      contextIcon: noSite ? 'location-crosshairs' : 'location-dot',
      contextIconColor: noSite ? 'var(--cx-warning-strong)' : 'var(--cx-mono-80)',
      noteText: s.noteText,
      noteCount: s.noteText.length + '/2000',
      noteHeight: Math.max(s.noteText ? (s.noteH || 0) : 0, 96),
      cannotSubmit: !s.noteText.trim(),
      hasPhotos: photos.length > 0,
      photoItems: photos.map(function (x) { return { src: x.a.src, remove: removeAt(x.i) }; }),
      gridTop: { style: { marginTop: 20 } },
      addAnchor: self._anchor,
      protoTop: { style: { margin: '0 16px 12px' } },
      protoSync: { style: { margin: '8px 16px' } },
      hasFiles: files.length > 0,
      fileItems: files.map(function (x, k) { return { name: x.a.name, divider: k < files.length - 1, remove: removeAt(x.i) }; }),
      attachMenuOpen: s.attachMenuOpen,
      attachMenuLeft: s.attachMenuPos ? s.attachMenuPos.left : 16,
      attachMenuTop: s.attachMenuPos ? s.attachMenuPos.top : 330,
      requiresAttention: s.requiresAttention,

      noSite: noSite,
      siteText: this.outsideShift() ? 'Started outside a shift' : noSite ? 'No site matches your location' : this.ctxShift().site,
      sitePillLabel: noSite ? 'Not captured' : 'Auto-captured',
      sitePillTone: 'neutral',
      sitePillIcon: '',
      shiftText: this.outsideShift() ? 'Started outside a shift' : this.shiftCaptureLabel(),
      tourDisplay: this.outsideShift() ? 'Started outside a shift' : ctx.tour === 'None' ? 'Started outside a tour' : ctx.tour,
      ctxPillLabel: this.outsideShift() ? 'Not captured' : 'Auto-captured',
      tourPillLabel: this.outsideShift() || ctx.tour === 'None' ? 'Not captured' : 'Auto-captured',
      ctxPillTone: 'neutral',
      // Captured-state pills sit in ListRow's trailing column (library, Nov 10).
      sitePill: pillEl({ label: noSite ? 'Not captured' : 'Auto-captured', tone: 'neutral' }),
      shiftPill: pillEl({ label: this.outsideShift() ? 'Not captured' : 'Auto-captured', tone: 'neutral' }),
      tourPill: pillEl({ label: this.outsideShift() || ctx.tour === 'None' ? 'Not captured' : 'Auto-captured', tone: 'neutral' }),
      locPill: pillEl({ label: 'Auto-captured', tone: 'neutral' }),
      drawerActions: [
        { icon: 'clipboard-list', iconVariant: 'regular', label: 'Incident report', iconBg: 'var(--cx-warning-light)', iconColor: 'var(--cx-warning-strong)', onClick: self.h.onDrawerIncident },
        { icon: 'clock-rotate-left', label: 'Report history', onClick: self.h.onDrawerHistory }],
      pendingCheckpointDisplay: noSite ? '' : (pendingCp || 'No checkpoint'),
      checkpointPlaceholder: this.outsideShift() ? 'Not available outside a shift' : noSite ? 'Not available without a site' : 'Select checkpoint',
      checkpointHint: this.noContext() ? 'Checkpoints come from the site. Start the report from your shift to capture it.' : noSite ? 'Checkpoints come from the site you are at.' : 'Originally captured: ' + (s.reportFrom === 'checkpoint' ? 'Front Door' : 'No checkpoint'),
      checkpointSheetOpen: s.checkpointSheetOpen,
      whenDateLabel: pl.date,
      whenTimeLabel: pl.time,
      timeOpen: s.timeOpen,
      dateOpen: s.dateOpen,
      pickerOpen: s.dateOpen || s.timeOpen,
      dateChipInk: s.dateOpen ? '#007AFF' : '#000',
      timeChipInk: s.timeOpen ? '#007AFF' : '#000',
      hourOptions: Array.from({ length: 12 }, function (_, i) { return { idx: i, label: String(i + 1) }; }),
      minOptions: Array.from({ length: 60 }, function (_, i) { return { idx: i, label: String(i).padStart(2, '0') }; }),
      merOptions: [{ idx: 0, label: 'AM' }, { idx: 1, label: 'PM' }],
      weekdayLabels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      calendarCells: cells,

      reportsTitle: s.reportsMode === 'history' ? 'Report history' : 'Shift reports',
      isHistory: s.reportsMode === 'history',
      reportGroups: this.reportGroups(),
      reportsEmpty: this.reportGroups().length === 0,
      reportsEmptyText: s.reportsMode !== 'history' ? 'No reports filed during this shift.' : 'No reports in the last 30 days.',
      detailPills: this.reportPills(report, dSynced),
      waitPill: this.reportPills(report, false)[0],
      enhWaitingText: !s.syncPhase || !!viewed,
      enhWaitingCopy: (!s.syncPhase || !!viewed) ? 'Appears here as soon as a signal comes back.' : '',
      enhBefore: dSynced && s.syncPhase === 'updating' && DSX ? h(DSX.InlineNotice, { tone: 'progress', variant: 'line' }, 'Updating') : null,
      reportRequiresAttention: !!report.requiresAttention && dSynced && !fuNotifyPending,
      notifyPending: (!!report.requiresAttention && !dSynced) || fuNotifyPending,
      enhUpdating: dSynced && s.syncPhase === 'updating',
      notifiedText: 'Supervisor notified · ' + (function () {
        // The latest notification sent: the note's goes out at sync, a follow-up's when it is saved.
        var t = report.noteNotified !== false ? [syncedAt] : [];
        (report.followUps || []).forEach(function (f) { if (f.notified) t.push(f.time); });
        return t.length ? t[t.length - 1] : syncedAt;
      })(),
      reportTitle: reportTitle,

      synced: dSynced,
      notSynced: !dSynced,
      showSubmitBanner: s.justSubmitted && !s.bannerDismissed,
      showCheckoutToast: !!s.checkoutToast && scr === 'shift',
      offShiftActions: [
        { icon: 'calendar-days', variant: 'solid', label: 'Review my\nschedule', onClick: function () { self.setState({ screen: 'schedule', checkoutToast: false }); } },
        { icon: 'plus', variant: 'solid', label: 'Create\nunscheduled shift' },
        { icon: 'comments', label: 'Contact\nsupervisor' }
      ],
      reportByline: this.reportByline(report),
      submissions: this.submissionVals(report, dSynced),
      detailRow: { style: { background: 'transparent', height: 'auto' } },
      tightHeader: { style: { height: 'auto', padding: '4px 0 0' } },
      originalNoteLabel: 'Original note',
      enhancedText: report.enhanced || this.ENHANCED,
      enhancedMore: this.moreFor('enhanced', report.enhanced || this.ENHANCED),
      noteMore: this.moreFor('note', report.text),
      reportText: report.text,
      reportHasPhotos: rPhotos.length > 0,
      reportPhotoItems: rPhotos.map(function (a) { return { src: a.src }; }),
      reportHasFiles: rFiles.length > 0,
      reportFileItems: rFiles.map(function (a, k) { return { name: a.name, divider: k < rFiles.length - 1 }; }),
      hasFollowUps: nFu > 0,
      followUpCount: nFu,
      followUps: (report.followUps || []).map(function (fu, i) { return { title: 'Follow-up ' + (i + 1) + ' · ' + fu.time, text: fu.text, more: self.moreFor('fu' + i, fu.text) }; }),
      syncBannerTone: (fuQueued ? !!s.syncPhase : dSynced ? false : (!!s.syncPhase && !viewed)) ? 'progress' : (!fuQueued && dSynced) ? 'success' : 'warning',
      syncBannerIcon: fuQueued ? (s.syncPhase ? 'spinner' : 'cloud-arrow-up') : dSynced ? 'check' : (s.syncPhase && !viewed ? 'spinner' : 'cloud-arrow-up'),
      syncBannerTitle: dSynced ? 'Synced at ' + syncedAt + '.' : 'Waiting for a connection.',
      syncBannerText: fuQueued ? (s.syncPhase ? 'Sending' : 'Waiting for a connection · follow-up saved on this device') : dSynced ? 'Synced ' + syncedAt + ' · visible to your supervisor' : (s.syncPhase && !viewed ? 'Sending' : 'Waiting for a connection · saved on this device')
    });
  }
}
