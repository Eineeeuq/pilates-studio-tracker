// =====================================================
// Pilates Studio Tracker - Main Application
// =====================================================

// --- Data Layer ---
const Store = {
    get(key) {
        try {
            return JSON.parse(localStorage.getItem(key)) || [];
        } catch {
            return [];
        }
    },
    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    getStudents() { return this.get('pilates_students'); },
    saveStudents(students) { this.set('pilates_students', students); },
};

// --- Exercise Database ---
const ExerciseDB = {
    warmup: {
        beginner: [
            { name: 'Breathing & Centering', duration: '3 min', detail: 'Diaphragmatic breathing, find neutral spine' },
            { name: 'Pelvic Tilts', duration: '2 min', detail: '8-10 reps, gentle mobilization' },
            { name: 'Knee Folds', duration: '2 min', detail: '6 each side, stabilize pelvis' },
            { name: 'Cat-Cow Stretch', duration: '2 min', detail: '8 reps, spinal articulation' },
            { name: 'Shoulder Rolls', duration: '1 min', detail: '8 forward, 8 back' },
            { name: 'Head Nods & Turns', duration: '2 min', detail: 'Gentle cervical mobilization' },
            { name: 'Arm Reaches', duration: '2 min', detail: 'Overhead and across body' },
            { name: 'Hip Circles', duration: '2 min', detail: 'Small circles, both directions' },
        ],
        intermediate: [
            { name: 'Breathing with Arm Circles', duration: '2 min', detail: 'Coordinate breath with movement' },
            { name: 'Pelvic Clock', duration: '2 min', detail: 'Full clock mobilization' },
            { name: 'Spine Twist Supine', duration: '2 min', detail: '6 each side' },
            { name: 'Cat-Cow with Leg Extension', duration: '2 min', detail: '8 reps with alternating legs' },
            { name: 'Chest Opener', duration: '2 min', detail: 'Thoracic extension over roller' },
            { name: 'Roll Down', duration: '2 min', detail: 'Standing articulation of spine' },
            { name: 'Leg Circles Small', duration: '2 min', detail: '6 each direction, each leg' },
        ],
        advanced: [
            { name: 'Standing Roll Down', duration: '2 min', detail: 'Full articulation with control' },
            { name: 'Hundred Prep', duration: '2 min', detail: 'Build to 50 pumps' },
            { name: 'Spine Articulation Flow', duration: '3 min', detail: 'Cat-cow to child\'s pose to cobra flow' },
            { name: 'Dynamic Leg Circles', duration: '2 min', detail: '8 each direction' },
            { name: 'Standing Balance Series', duration: '2 min', detail: 'Single leg with arm movements' },
            { name: 'Thread the Needle Flow', duration: '2 min', detail: 'Dynamic thoracic rotation' },
        ],
    },
    main: {
        core: {
            beginner: [
                { name: 'The Hundred (Modified)', duration: '3 min', detail: 'Feet on floor, pump arms' },
                { name: 'Single Leg Stretch (Modified)', duration: '3 min', detail: 'Head down, 8 each side' },
                { name: 'Toe Taps', duration: '3 min', detail: '10 each leg, tabletop position' },
                { name: 'Dead Bug', duration: '3 min', detail: '8 each side, opposite arm/leg' },
                { name: 'Bridge with March', duration: '3 min', detail: 'Hold bridge, alternate lifting feet' },
                { name: 'Plank Hold', duration: '2 min', detail: 'Modified on knees, 3x20 sec' },
                { name: 'Side-Lying Core Activation', duration: '3 min', detail: 'Clam with core engagement' },
            ],
            intermediate: [
                { name: 'The Hundred', duration: '3 min', detail: 'Legs at 45 degrees, 100 pumps' },
                { name: 'Roll Up', duration: '3 min', detail: '6-8 reps, full articulation' },
                { name: 'Single Leg Stretch', duration: '3 min', detail: '10 each side, head lifted' },
                { name: 'Double Leg Stretch', duration: '3 min', detail: '8 reps, circle arms' },
                { name: 'Criss-Cross', duration: '3 min', detail: '10 each side, oblique focus' },
                { name: 'Plank to Pike', duration: '3 min', detail: '8 reps, controlled' },
                { name: 'Swimming', duration: '3 min', detail: '30 sec intervals x 3' },
                { name: 'Teaser Prep', duration: '3 min', detail: 'One leg extended, 6 reps' },
            ],
            advanced: [
                { name: 'The Hundred', duration: '2 min', detail: 'Legs low, 100 pumps' },
                { name: 'Roll Up', duration: '2 min', detail: '8 reps, slow and controlled' },
                { name: 'Series of Five', duration: '5 min', detail: 'All 5 exercises back-to-back' },
                { name: 'Teaser Full', duration: '3 min', detail: '5 reps, V-position' },
                { name: 'Corkscrew', duration: '3 min', detail: '6 each direction' },
                { name: 'Jackknife', duration: '3 min', detail: '5 reps with control' },
                { name: 'Plank Series', duration: '4 min', detail: 'Front, side, reverse flow' },
                { name: 'Control Balance', duration: '3 min', detail: '4 each side' },
            ],
        },
        flexibility: {
            beginner: [
                { name: 'Seated Forward Fold', duration: '3 min', detail: 'Use strap if needed, hold 30 sec x 3' },
                { name: 'Supine Hamstring Stretch', duration: '3 min', detail: 'With strap, 30 sec each leg' },
                { name: 'Hip Flexor Stretch', duration: '3 min', detail: 'Low lunge, 30 sec each side' },
                { name: 'Seated Spinal Twist', duration: '3 min', detail: 'Gentle rotation, 30 sec each side' },
                { name: 'Figure Four Stretch', duration: '3 min', detail: 'Glute/piriformis, 30 sec each' },
                { name: 'Side Stretch', duration: '2 min', detail: 'Seated or standing, each side' },
                { name: 'Chest Stretch', duration: '2 min', detail: 'Doorway or arms behind back' },
            ],
            intermediate: [
                { name: 'Spine Stretch Forward', duration: '3 min', detail: '6 reps, C-curve' },
                { name: 'Saw', duration: '3 min', detail: '6 each side, twist and reach' },
                { name: 'Mermaid Stretch', duration: '3 min', detail: '4 each side with arm reach' },
                { name: 'Swan Prep', duration: '3 min', detail: '6 reps, back extension' },
                { name: 'Pigeon Stretch', duration: '4 min', detail: '90 sec each side' },
                { name: 'Open Leg Rocker', duration: '3 min', detail: '6 reps, balance and flexibility' },
                { name: 'Rolling Like a Ball', duration: '3 min', detail: '8 reps, spinal massage' },
            ],
            advanced: [
                { name: 'Spine Stretch Forward', duration: '2 min', detail: '8 reps, deep C-curve' },
                { name: 'Saw with Reach', duration: '3 min', detail: '8 each side, pulse at end' },
                { name: 'Swan Dive', duration: '3 min', detail: '5 reps, full back extension' },
                { name: 'Star Stretch', duration: '3 min', detail: 'Side-lying, full body opening' },
                { name: 'Boomerang', duration: '3 min', detail: '4 reps, flow sequence' },
                { name: 'Splits Prep', duration: '4 min', detail: 'Progressive hip opener series' },
                { name: 'Seal', duration: '2 min', detail: '8 reps, playful rolling' },
            ],
        },
        strength: {
            beginner: [
                { name: 'Bridging', duration: '3 min', detail: '10 reps, articulate spine' },
                { name: 'Clam Series', duration: '3 min', detail: '12 each side, band optional' },
                { name: 'Side-Lying Leg Lifts', duration: '3 min', detail: '10 each side, hip stability' },
                { name: 'Wall Push-Ups', duration: '3 min', detail: '3 sets of 10' },
                { name: 'Standing Leg Press', duration: '3 min', detail: 'Against wall, 10 each leg' },
                { name: 'Arm Series with Light Weights', duration: '4 min', detail: '1-2 lb, boxing/hug-a-tree' },
                { name: 'Quadruped Arm/Leg Reach', duration: '3 min', detail: '8 each side, bird-dog' },
            ],
            intermediate: [
                { name: 'Shoulder Bridge', duration: '3 min', detail: 'Single leg variation, 6 each' },
                { name: 'Side Kick Series', duration: '4 min', detail: 'Front/back, up/down, circles' },
                { name: 'Swimming', duration: '3 min', detail: '30 sec x 3, back strengthening' },
                { name: 'Leg Pull Front', duration: '3 min', detail: 'Plank with leg lift, 6 each' },
                { name: 'Push-Up Pilates Style', duration: '3 min', detail: '8 reps, roll down to plank' },
                { name: 'Side Plank', duration: '3 min', detail: '20 sec each side x 3' },
                { name: 'Thigh Stretch', duration: '3 min', detail: 'Kneeling, lean back, 6 reps' },
            ],
            advanced: [
                { name: 'Shoulder Bridge Single Leg', duration: '3 min', detail: '8 each side, full extension' },
                { name: 'Side Kick Kneeling', duration: '3 min', detail: '8 each side, balance challenge' },
                { name: 'Leg Pull Back', duration: '3 min', detail: 'Reverse plank leg lift, 6 each' },
                { name: 'Push-Up with Rotation', duration: '3 min', detail: '6 each side' },
                { name: 'Twist Series', duration: '4 min', detail: 'Seated, progressive difficulty' },
                { name: 'Rocking', duration: '3 min', detail: '8 reps, prone back extension' },
                { name: 'Side Bend', duration: '3 min', detail: '6 each side, full body' },
            ],
        },
        balance: {
            beginner: [
                { name: 'Standing on One Leg', duration: '3 min', detail: '30 sec each side x 2' },
                { name: 'Heel-Toe Walk', duration: '2 min', detail: 'Forward and back, arms out' },
                { name: 'Tree Pose (Modified)', duration: '3 min', detail: 'Foot at ankle, 30 sec each' },
                { name: 'Weight Shifts', duration: '2 min', detail: 'Side to side, front to back' },
                { name: 'Seated Balance', duration: '3 min', detail: 'Sit bones balance, feet lifted' },
                { name: 'Tabletop Balance', duration: '3 min', detail: 'Opposite arm/leg extend, 8 each' },
            ],
            intermediate: [
                { name: 'Single Leg Standing Series', duration: '3 min', detail: 'Arabesque, passé, 30 sec each' },
                { name: 'Kneeling Balance', duration: '3 min', detail: 'Arm and leg reach, 6 each' },
                { name: 'Rolling Like a Ball', duration: '3 min', detail: '8 reps, find balance point' },
                { name: 'Open Leg Rocker', duration: '3 min', detail: '6 reps, hamstring/balance' },
                { name: 'Standing Footwork', duration: '3 min', detail: 'Relevé, single leg, pulses' },
                { name: 'Warrior Balance Flow', duration: '4 min', detail: 'W3 to standing, each side' },
            ],
            advanced: [
                { name: 'Star on Reformer Floor', duration: '3 min', detail: 'Full body balance, 4 each side' },
                { name: 'Teaser Balance Hold', duration: '3 min', detail: 'V-sit variations, 30 sec holds' },
                { name: 'Standing Leg Series', duration: '4 min', detail: 'All directions, no support' },
                { name: 'Boomerang', duration: '3 min', detail: '4 reps, full balance challenge' },
                { name: 'Control Front & Back', duration: '4 min', detail: 'Controlled movement, 4 each' },
                { name: 'Single Leg Squat Prep', duration: '3 min', detail: '6 each side, slow' },
            ],
        },
        posture: {
            beginner: [
                { name: 'Chest Opener on Roller', duration: '3 min', detail: 'Supine, arms wide, 2 min hold' },
                { name: 'Chin Tucks', duration: '2 min', detail: '10 reps, cervical alignment' },
                { name: 'Scapular Protraction/Retraction', duration: '3 min', detail: '10 reps, shoulder blade awareness' },
                { name: 'Wall Angels', duration: '3 min', detail: '10 reps, back against wall' },
                { name: 'Seated Posture Check', duration: '2 min', detail: 'Alignment cues and holds' },
                { name: 'Prone Back Extension', duration: '3 min', detail: 'Baby cobra, 8 reps' },
                { name: 'Shoulder Blade Squeeze', duration: '2 min', detail: '12 reps with hold' },
            ],
            intermediate: [
                { name: 'Thoracic Extension', duration: '3 min', detail: 'Over roller, 10 reps' },
                { name: 'Swan Prep', duration: '3 min', detail: '6 reps, upper back focus' },
                { name: 'Prone Arm Lifts', duration: '3 min', detail: 'T, Y, W positions, 8 each' },
                { name: 'Seated Spine Twist', duration: '3 min', detail: '8 each side, tall spine' },
                { name: 'Arm Series Standing', duration: '4 min', detail: 'Weights, postural muscles' },
                { name: 'Side-Lying Rotation', duration: '3 min', detail: 'Book opening, 8 each side' },
            ],
            advanced: [
                { name: 'Swan Dive', duration: '3 min', detail: '5 reps, full extension' },
                { name: 'Pulling Straps', duration: '3 min', detail: 'Prone, resistance band, 8 reps' },
                { name: 'Kneeling Arm Series', duration: '4 min', detail: 'Upright posture challenge with weights' },
                { name: 'Standing Balance with Rotation', duration: '3 min', detail: '6 each side' },
                { name: 'Rocking', duration: '3 min', detail: '6 reps, spinal extension' },
                { name: 'High Plank to Downdog', duration: '3 min', detail: '8 reps, shoulder stability' },
            ],
        },
        rehabilitation: {
            beginner: [
                { name: 'Gentle Pelvic Floor Activation', duration: '3 min', detail: 'Engage and release, 10 reps' },
                { name: 'Supine Marching', duration: '3 min', detail: 'Slow, controlled, 8 each leg' },
                { name: 'Supported Bridge', duration: '3 min', detail: 'Block under sacrum, hold 30 sec x 3' },
                { name: 'Arm Slides on Wall', duration: '3 min', detail: '10 reps, shoulder rehab' },
                { name: 'Ankle Pumps & Circles', duration: '2 min', detail: '10 each direction, circulation' },
                { name: 'Gentle Spinal Rotation', duration: '3 min', detail: 'Knees side to side, 8 each' },
                { name: 'Diaphragmatic Breathing', duration: '3 min', detail: 'Hands on ribs, 10 cycles' },
            ],
            intermediate: [
                { name: 'Bridge with Adductor Squeeze', duration: '3 min', detail: 'Ball between knees, 10 reps' },
                { name: 'Side-Lying Hip Series', duration: '4 min', detail: 'Gentle clam, lift, circle' },
                { name: 'Seated Spine Mobility', duration: '3 min', detail: 'Flexion, extension, rotation' },
                { name: 'Standing Weight Shift', duration: '3 min', detail: 'Heel raises, single leg prep' },
                { name: 'Prone Back Extension', duration: '3 min', detail: 'Gentle, hands under shoulders' },
                { name: 'Resistance Band Arm Work', duration: '3 min', detail: 'Light resistance, all directions' },
            ],
            advanced: [
                { name: 'Functional Movement Flow', duration: '4 min', detail: 'Sit to stand, reach, step' },
                { name: 'Single Leg Balance Work', duration: '3 min', detail: 'Progressive surfaces' },
                { name: 'Bridge Variations', duration: '3 min', detail: 'Single leg, marching, pulses' },
                { name: 'Plank Progressions', duration: '3 min', detail: 'From wall to floor' },
                { name: 'Sport-Specific Prep', duration: '4 min', detail: 'Movements toward activity goals' },
            ],
        },
        'back-pain': {
            beginner: [
                { name: 'Pelvic Tilts', duration: '3 min', detail: '12 reps, relieve tension' },
                { name: 'Knee to Chest', duration: '3 min', detail: 'Single and double, 30 sec holds' },
                { name: 'Cat-Cow', duration: '3 min', detail: '10 reps, slow and controlled' },
                { name: "Child's Pose", duration: '2 min', detail: 'Rest position, breathe deeply' },
                { name: 'Supine Twist', duration: '3 min', detail: 'Gentle, knees together, each side' },
                { name: 'Bridge', duration: '3 min', detail: '8 reps, articulate through spine' },
                { name: 'Prone Press Up', duration: '2 min', detail: 'Gentle extension, 6 reps' },
            ],
            intermediate: [
                { name: 'Spine Articulation Series', duration: '4 min', detail: 'Roll up/down, bridging, rotation' },
                { name: 'Swimming Prep', duration: '3 min', detail: 'Opposite arm/leg, 8 each' },
                { name: 'Side Plank Modified', duration: '3 min', detail: 'Forearm, 15 sec x 3 each side' },
                { name: 'Thread the Needle', duration: '3 min', detail: '6 each side, thoracic mobility' },
                { name: 'Bird Dog', duration: '3 min', detail: '8 each side, core stability' },
                { name: 'Hip Flexor Release', duration: '3 min', detail: 'Low lunge with breath' },
            ],
            advanced: [
                { name: 'Spinal Mobility Flow', duration: '4 min', detail: 'Cat-cow, thread needle, rotation flow' },
                { name: 'Plank Variations', duration: '3 min', detail: 'Front, side, with movement' },
                { name: 'Back Extension Series', duration: '3 min', detail: 'Swan, swimming, rocking' },
                { name: 'Standing Spinal Work', duration: '3 min', detail: 'Roll down, twist, side bend' },
                { name: 'Full Body Integration', duration: '4 min', detail: 'Flow combining all planes of motion' },
            ],
        },
        prenatal: {
            beginner: [
                { name: 'Seated Cat-Cow', duration: '3 min', detail: 'On ball or chair, gentle' },
                { name: 'Pelvic Floor Activation', duration: '3 min', detail: 'Kegel variations, 10 reps' },
                { name: 'Side-Lying Clams', duration: '3 min', detail: '10 each side, hip stability' },
                { name: 'Wall Push-Ups', duration: '3 min', detail: '10 reps, upper body strength' },
                { name: 'Standing Pelvic Tilts', duration: '3 min', detail: '10 reps, against wall' },
                { name: 'Seated Arm Work', duration: '3 min', detail: 'Light weights, 8 reps each' },
                { name: 'Ankle Circles & Calf Raises', duration: '2 min', detail: 'Circulation, 10 each' },
            ],
            intermediate: [
                { name: 'All-Fours Cat-Cow', duration: '3 min', detail: '8 reps, spinal mobility' },
                { name: 'Side-Lying Leg Series', duration: '4 min', detail: 'Lifts, circles, clams' },
                { name: 'Standing Balance Work', duration: '3 min', detail: 'Single leg, wall support' },
                { name: 'Seated Spine Twist', duration: '3 min', detail: 'Gentle rotation, 6 each' },
                { name: 'Bridge Variations', duration: '3 min', detail: 'Supported, with ball squeeze' },
                { name: 'Arm Toning Series', duration: '3 min', detail: '2-3 lb weights, posture focus' },
            ],
            advanced: [
                { name: 'Dynamic Standing Work', duration: '4 min', detail: 'Squats, lunges (supported)' },
                { name: 'Side-Lying Full Series', duration: '4 min', detail: 'Hip strengthening progressions' },
                { name: 'Seated Core Engagement', duration: '3 min', detail: 'Gentle oblique and TA work' },
                { name: 'Standing Arm Series', duration: '3 min', detail: 'Functional strength patterns' },
                { name: 'Pelvic Floor Integration', duration: '3 min', detail: 'With movement patterns' },
            ],
        },
    },
    cooldown: {
        beginner: [
            { name: 'Full Body Stretch', duration: '3 min', detail: 'Supine, arms overhead, lengthen' },
            { name: 'Knee to Chest', duration: '2 min', detail: 'Single then both, hold 20 sec' },
            { name: 'Supine Spinal Twist', duration: '3 min', detail: '30 sec each side' },
            { name: 'Seated Forward Fold', duration: '2 min', detail: 'Gentle hamstring release' },
            { name: 'Deep Breathing & Relaxation', duration: '3 min', detail: 'Body scan, progressive relaxation' },
            { name: "Child's Pose", duration: '2 min', detail: 'Rest and restore' },
        ],
        intermediate: [
            { name: 'Mermaid Stretch', duration: '2 min', detail: 'Side body opening, each side' },
            { name: 'Figure Four Stretch', duration: '2 min', detail: '30 sec each side' },
            { name: 'Supine Twist', duration: '2 min', detail: '30 sec each side' },
            { name: 'Neck Stretches', duration: '2 min', detail: 'Ear to shoulder, gentle' },
            { name: 'Savasana with Body Scan', duration: '3 min', detail: 'Full relaxation, conscious release' },
            { name: 'Seated Meditation', duration: '2 min', detail: 'Centering, breath awareness' },
        ],
        advanced: [
            { name: 'Full Body Stretch Flow', duration: '3 min', detail: 'Integrated stretching sequence' },
            { name: 'Foam Roller Release', duration: '3 min', detail: 'IT band, thoracic, calves' },
            { name: 'Pigeon Pose', duration: '2 min', detail: '60 sec each side, deep hip' },
            { name: 'Restorative Backbend', duration: '2 min', detail: 'Supported over bolster' },
            { name: 'Final Relaxation', duration: '3 min', detail: 'Savasana with guided imagery' },
        ],
    },

    generateProgram(student) {
        const level = student.level;
        const focusAreas = student.focusAreas && student.focusAreas.length > 0
            ? student.focusAreas
            : ['core', 'flexibility'];

        const program = {
            studentName: `${student.firstName} ${student.lastName}`,
            level: level,
            date: new Date().toISOString(),
            sections: [],
            totalMinutes: 60,
        };

        // Warm-up: 10 minutes
        const warmupExercises = this._pickRandom(this.warmup[level], 4, 10);
        program.sections.push({
            title: 'Warm-Up',
            duration: '10 min',
            exercises: warmupExercises,
        });

        // Main work: 40 minutes, split across focus areas
        const minutesPerFocus = Math.floor(40 / focusAreas.length);
        focusAreas.forEach(area => {
            const areaKey = area;
            const exercises = this.main[areaKey]
                ? this._pickRandom(this.main[areaKey][level] || this.main[areaKey].beginner, 4, minutesPerFocus)
                : this._pickRandom(this.main.core[level], 4, minutesPerFocus);

            const areaNames = {
                core: 'Core Work',
                flexibility: 'Flexibility & Mobility',
                strength: 'Strength Training',
                balance: 'Balance & Stability',
                posture: 'Posture Correction',
                rehabilitation: 'Rehabilitation',
                'back-pain': 'Back Care',
                prenatal: 'Prenatal Pilates',
            };

            program.sections.push({
                title: areaNames[area] || area,
                duration: `${minutesPerFocus} min`,
                exercises: exercises,
            });
        });

        // Cool-down: 10 minutes
        const cooldownExercises = this._pickRandom(this.cooldown[level], 4, 10);
        program.sections.push({
            title: 'Cool-Down & Stretch',
            duration: '10 min',
            exercises: cooldownExercises,
        });

        // Add modifications based on injuries
        if (student.injuries && student.injuries.trim()) {
            program.notes = `Modifications needed for: ${student.injuries}. Avoid exercises that aggravate these conditions and offer alternatives as needed.`;
        }

        return program;
    },

    _pickRandom(arr, count, targetMinutes) {
        if (!arr || arr.length === 0) return [];
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, Math.min(count, arr.length));

        // Adjust durations to fit target
        const totalCurrent = picked.reduce((sum, e) => sum + parseInt(e.duration), 0);
        if (totalCurrent !== targetMinutes && picked.length > 0) {
            const diff = targetMinutes - totalCurrent;
            const adjust = Math.round(diff / picked.length);
            return picked.map(e => ({
                ...e,
                duration: `${Math.max(1, parseInt(e.duration) + adjust)} min`,
            }));
        }
        return picked;
    },
};

// --- App State ---
let currentView = 'dashboard';
let currentStudentId = null;
let editingStudentId = null;
let currentProgram = null;
let scheduleWeekOffset = 0;

// --- Utility ---
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

function formatDate(dateStr) {
    if (!dateStr) return 'Not set';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateTime(dateStr) {
    if (!dateStr) return 'Not scheduled';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: 'numeric', minute: '2-digit',
    });
}

function formatTimeShort(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function getInitials(first, last) {
    return ((first || '')[0] || '') + ((last || '')[0] || '');
}

function isToday(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const today = new Date();
    return d.toDateString() === today.toDateString();
}

function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear()
        && d1.getMonth() === d2.getMonth()
        && d1.getDate() === d2.getDate();
}

function getWeekDates(offset = 0) {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek + (offset * 7));
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        dates.push(d);
    }
    return dates;
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// --- Navigation ---
function navigateTo(view) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    const viewEl = document.getElementById(`view-${view}`);
    if (viewEl) viewEl.classList.add('active');

    const navLink = document.querySelector(`[data-view="${view}"]`);
    if (navLink) navLink.classList.add('active');

    currentView = view;
    renderView(view);
}

function renderView(view) {
    switch (view) {
        case 'dashboard': renderDashboard(); break;
        case 'students': renderStudentsList(); break;
        case 'schedule': renderSchedule(); break;
        case 'student-detail': renderStudentDetail(); break;
    }
}

// --- Dashboard ---
function renderDashboard() {
    const students = Store.getStudents();
    const today = new Date();

    document.getElementById('stat-total-students').textContent = students.length;

    const classesToday = students.filter(s => s.nextClass && isToday(s.nextClass)).length;
    document.getElementById('stat-classes-today').textContent = classesToday;

    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const classesWeek = students.filter(s => {
        if (!s.nextClass) return false;
        const d = new Date(s.nextClass);
        return d >= today && d <= weekEnd;
    }).length;
    document.getElementById('stat-classes-week').textContent = classesWeek;

    // Upcoming classes
    const upcoming = students
        .filter(s => s.nextClass && new Date(s.nextClass) >= new Date(today.toDateString()))
        .sort((a, b) => new Date(a.nextClass) - new Date(b.nextClass))
        .slice(0, 6);

    const upcomingList = document.getElementById('upcoming-classes-list');
    if (upcoming.length === 0) {
        upcomingList.innerHTML = '<div class="empty-state">No upcoming classes scheduled</div>';
    } else {
        upcomingList.innerHTML = upcoming.map(s => `
            <div class="upcoming-item" onclick="viewStudent('${s.id}')">
                <div>
                    <div class="student-name">${escapeHtml(s.firstName)} ${escapeHtml(s.lastName)}</div>
                    <div class="class-time">${formatTimeShort(s.nextClass)}</div>
                </div>
                <div class="class-date">${isToday(s.nextClass) ? 'Today' : formatDate(s.nextClass)}</div>
            </div>
        `).join('');
    }

    // Recent notes
    const allNotes = [];
    students.forEach(s => {
        (s.notes || []).forEach(n => {
            allNotes.push({ ...n, studentName: `${s.firstName} ${s.lastName}`, studentId: s.id });
        });
    });
    allNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentNotes = allNotes.slice(0, 5);

    const notesList = document.getElementById('recent-notes-list');
    if (recentNotes.length === 0) {
        notesList.innerHTML = '<div class="empty-state">No notes yet</div>';
    } else {
        notesList.innerHTML = recentNotes.map(n => `
            <div class="note-preview" onclick="viewStudent('${n.studentId}')">
                <div class="note-student">${escapeHtml(n.studentName)}</div>
                <div class="note-text">${escapeHtml(n.text)}</div>
                <div class="note-date">${formatDate(n.date)}</div>
            </div>
        `).join('');
    }
}

// --- Students List ---
function renderStudentsList(searchTerm = '') {
    let students = Store.getStudents();
    if (searchTerm) {
        const q = searchTerm.toLowerCase();
        students = students.filter(s =>
            `${s.firstName} ${s.lastName}`.toLowerCase().includes(q)
            || (s.email || '').toLowerCase().includes(q)
        );
    }

    students.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));

    const list = document.getElementById('students-list');
    if (students.length === 0) {
        list.innerHTML = `<div class="empty-state">
            ${searchTerm ? 'No students match your search' : 'No students yet. Click "+ Add Student" to get started!'}
        </div>`;
        return;
    }

    list.innerHTML = students.map(s => `
        <div class="student-card" onclick="viewStudent('${s.id}')">
            <div class="student-card-header">
                <div class="student-avatar">${getInitials(s.firstName, s.lastName)}</div>
                <div>
                    <h3>${escapeHtml(s.firstName)} ${escapeHtml(s.lastName)}</h3>
                    <span class="level-badge level-${s.level}">${s.level}</span>
                </div>
            </div>
            <div class="student-card-meta">
                ${s.nextClass
                    ? `Next class: <span class="next-class">${formatDateTime(s.nextClass)}</span>`
                    : 'No class scheduled'
                }
            </div>
        </div>
    `).join('');
}

// --- Student Detail ---
function viewStudent(id) {
    currentStudentId = id;
    navigateTo('student-detail');
}

function renderStudentDetail() {
    const students = Store.getStudents();
    const student = students.find(s => s.id === currentStudentId);
    if (!student) {
        navigateTo('students');
        return;
    }

    document.getElementById('detail-avatar').textContent = getInitials(student.firstName, student.lastName);
    document.getElementById('detail-name').textContent = `${student.firstName} ${student.lastName}`;
    const levelBadge = document.getElementById('detail-level');
    levelBadge.textContent = student.level;
    levelBadge.className = `level-badge level-${student.level}`;
    document.getElementById('detail-email').textContent = student.email || 'Not provided';
    document.getElementById('detail-phone').textContent = student.phone || 'Not provided';
    document.getElementById('detail-start-date').textContent = formatDate(student.startDate);
    document.getElementById('detail-next-class').textContent = formatDateTime(student.nextClass);
    document.getElementById('detail-goals').textContent = student.goals || 'None specified';
    document.getElementById('detail-injuries').textContent = student.injuries || 'None reported';

    const focusAreasEl = document.getElementById('detail-focus-areas');
    const areaLabels = {
        core: 'Core Strength', flexibility: 'Flexibility', posture: 'Posture',
        balance: 'Balance', strength: 'Full Body Strength', rehabilitation: 'Rehabilitation',
        prenatal: 'Prenatal', 'back-pain': 'Back Pain Relief',
    };
    focusAreasEl.innerHTML = (student.focusAreas || []).map(a =>
        `<span class="tag">${areaLabels[a] || a}</span>`
    ).join('');

    renderNotes(student);
    renderPrograms(student);
    renderHistory(student);
}

function renderNotes(student) {
    const list = document.getElementById('notes-list');
    const notes = (student.notes || []).sort((a, b) => new Date(b.date) - new Date(a.date));

    if (notes.length === 0) {
        list.innerHTML = '<div class="empty-state">No notes yet. Add one above!</div>';
        return;
    }

    list.innerHTML = notes.map(n => `
        <div class="note-item">
            <div class="note-item-header">
                <span class="note-item-date">${formatDateTime(n.date)}</span>
                <button class="note-delete" onclick="deleteNote('${n.id}')" title="Delete note">&times;</button>
            </div>
            <div class="note-item-text">${escapeHtml(n.text)}</div>
        </div>
    `).join('');
}

function renderPrograms(student) {
    const list = document.getElementById('programs-list');
    const programs = (student.programs || []).sort((a, b) => new Date(b.date) - new Date(a.date));

    if (programs.length === 0) {
        list.innerHTML = '<div class="empty-state">No programs generated yet. Click "Generate Program" to create one!</div>';
        return;
    }

    list.innerHTML = programs.map(p => `
        <div class="program-item">
            <div class="program-item-header">
                <span class="program-item-date">${formatDate(p.date)}</span>
                <button class="program-delete" onclick="deleteProgram('${p.id}')" title="Delete program">&times;</button>
            </div>
            ${p.notes ? `<p style="font-size:12px;color:var(--warning);margin-bottom:10px;">${escapeHtml(p.notes)}</p>` : ''}
            ${p.sections.map(section => `
                <div class="program-section">
                    <div class="program-section-title">
                        ${escapeHtml(section.title)}
                        <span class="program-section-time">${section.duration}</span>
                    </div>
                    ${section.exercises.map(ex => `
                        <div class="exercise-item">
                            <span class="exercise-name">${escapeHtml(ex.name)}</span>
                            <span class="exercise-detail">${escapeHtml(ex.duration)} &mdash; ${escapeHtml(ex.detail)}</span>
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        </div>
    `).join('');
}

function renderHistory(student) {
    const list = document.getElementById('history-list');
    const history = (student.classHistory || []).sort((a, b) => new Date(b.date) - new Date(a.date));

    if (history.length === 0) {
        list.innerHTML = '<div class="empty-state">No class history yet</div>';
        return;
    }

    list.innerHTML = history.map(h => `
        <div class="history-item">
            <div class="history-dot"></div>
            <div class="history-date">${formatDateTime(h.date)}</div>
            <div class="history-note">${escapeHtml(h.note || 'Class completed')}</div>
        </div>
    `).join('');
}

// --- Schedule ---
function renderSchedule() {
    const dates = getWeekDates(scheduleWeekOffset);
    const students = Store.getStudents();

    // Week label
    const startStr = dates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = dates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    document.getElementById('schedule-week-label').textContent = `${startStr} - ${endStr}`;

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();

    const grid = document.getElementById('schedule-grid');
    grid.innerHTML = dates.map(date => {
        const isTodayClass = isSameDay(date, today) ? ' today' : '';
        const classesOnDay = students.filter(s => {
            if (!s.nextClass) return false;
            return isSameDay(new Date(s.nextClass), date);
        }).sort((a, b) => new Date(a.nextClass) - new Date(b.nextClass));

        // Also check recurring classes
        const recurringOnDay = getRecurringClassesForDate(students, date);
        const allClasses = [...classesOnDay];

        // Add recurring that aren't already in the list
        recurringOnDay.forEach(rc => {
            if (!allClasses.find(c => c.id === rc.id)) {
                allClasses.push(rc);
            }
        });

        allClasses.sort((a, b) => {
            const timeA = a.nextClass ? new Date(a.nextClass) : new Date();
            const timeB = b.nextClass ? new Date(b.nextClass) : new Date();
            return timeA - timeB;
        });

        return `
            <div class="schedule-day${isTodayClass}">
                <div class="schedule-day-header">${dayNames[date.getDay()]}</div>
                <div class="schedule-day-number">${date.getDate()}</div>
                ${allClasses.map(s => `
                    <div class="schedule-class" onclick="viewStudent('${s.id}')">
                        <div class="class-student-name">${escapeHtml(s.firstName)} ${escapeHtml(s.lastName)}</div>
                        <div class="class-time-label">${s.nextClass ? formatTimeShort(s.nextClass) : ''}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }).join('');
}

function getRecurringClassesForDate(students, targetDate) {
    return students.filter(s => {
        if (!s.nextClass || !s.frequency || s.frequency === 'once') return false;

        const baseDate = new Date(s.nextClass);
        if (baseDate > targetDate) return false;

        const diffDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));

        switch (s.frequency) {
            case 'weekly': return diffDays % 7 === 0;
            case 'biweekly': return diffDays % 14 === 0;
            case 'twice-weekly': {
                const baseDay = baseDate.getDay();
                const targetDay = targetDate.getDay();
                const secondDay = (baseDay + 3) % 7;
                return targetDay === baseDay || targetDay === secondDay;
            }
            case 'three-weekly': {
                const baseDay2 = baseDate.getDay();
                const targetDay2 = targetDate.getDay();
                const second = (baseDay2 + 2) % 7;
                const third = (baseDay2 + 4) % 7;
                return targetDay2 === baseDay2 || targetDay2 === second || targetDay2 === third;
            }
            default: return false;
        }
    });
}

// --- Student CRUD ---
function openStudentModal(studentId = null) {
    editingStudentId = studentId;
    const modal = document.getElementById('modal-student');
    const title = document.getElementById('modal-student-title');

    if (studentId) {
        title.textContent = 'Edit Student';
        const students = Store.getStudents();
        const student = students.find(s => s.id === studentId);
        if (student) {
            document.getElementById('form-first-name').value = student.firstName;
            document.getElementById('form-last-name').value = student.lastName;
            document.getElementById('form-email').value = student.email || '';
            document.getElementById('form-phone').value = student.phone || '';
            document.getElementById('form-level').value = student.level;
            document.getElementById('form-start-date').value = student.startDate || '';
            document.getElementById('form-goals').value = student.goals || '';
            document.getElementById('form-injuries').value = student.injuries || '';
            document.getElementById('form-next-class').value = student.nextClass || '';
            document.getElementById('form-frequency').value = student.frequency || 'once';

            // Set checkboxes
            document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => {
                cb.checked = (student.focusAreas || []).includes(cb.value);
            });
        }
    } else {
        title.textContent = 'Add New Student';
        document.getElementById('student-form').reset();
        document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => cb.checked = false);
    }

    modal.classList.add('active');
}

function closeStudentModal() {
    document.getElementById('modal-student').classList.remove('active');
    editingStudentId = null;
}

function saveStudent(e) {
    e.preventDefault();

    const focusAreas = [];
    document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked').forEach(cb => {
        focusAreas.push(cb.value);
    });

    const studentData = {
        firstName: document.getElementById('form-first-name').value.trim(),
        lastName: document.getElementById('form-last-name').value.trim(),
        email: document.getElementById('form-email').value.trim(),
        phone: document.getElementById('form-phone').value.trim(),
        level: document.getElementById('form-level').value,
        startDate: document.getElementById('form-start-date').value,
        goals: document.getElementById('form-goals').value.trim(),
        injuries: document.getElementById('form-injuries').value.trim(),
        nextClass: document.getElementById('form-next-class').value,
        frequency: document.getElementById('form-frequency').value,
        focusAreas: focusAreas,
    };

    const students = Store.getStudents();

    if (editingStudentId) {
        const idx = students.findIndex(s => s.id === editingStudentId);
        if (idx !== -1) {
            students[idx] = { ...students[idx], ...studentData };
        }
    } else {
        studentData.id = generateId();
        studentData.notes = [];
        studentData.programs = [];
        studentData.classHistory = [];
        students.push(studentData);
    }

    Store.saveStudents(students);
    closeStudentModal();

    if (currentView === 'student-detail' && editingStudentId) {
        renderStudentDetail();
    } else {
        navigateTo('students');
    }
}

function deleteStudent() {
    if (!currentStudentId) return;
    if (!confirm('Are you sure you want to delete this student? This cannot be undone.')) return;

    let students = Store.getStudents();
    students = students.filter(s => s.id !== currentStudentId);
    Store.saveStudents(students);
    currentStudentId = null;
    navigateTo('students');
}

// --- Notes ---
function addNote() {
    const textEl = document.getElementById('new-note-text');
    const text = textEl.value.trim();
    if (!text || !currentStudentId) return;

    const students = Store.getStudents();
    const student = students.find(s => s.id === currentStudentId);
    if (!student) return;

    if (!student.notes) student.notes = [];
    student.notes.push({
        id: generateId(),
        text: text,
        date: new Date().toISOString(),
    });

    Store.saveStudents(students);
    textEl.value = '';
    renderStudentDetail();
}

function deleteNote(noteId) {
    const students = Store.getStudents();
    const student = students.find(s => s.id === currentStudentId);
    if (!student) return;

    student.notes = (student.notes || []).filter(n => n.id !== noteId);
    Store.saveStudents(students);
    renderStudentDetail();
}

// --- Program Generation ---
function openProgramModal() {
    const students = Store.getStudents();
    const student = students.find(s => s.id === currentStudentId);
    if (!student) return;

    currentProgram = ExerciseDB.generateProgram(student);
    renderProgramModal(currentProgram);
    document.getElementById('modal-program').classList.add('active');
}

function renderProgramModal(program) {
    const content = document.getElementById('program-content');

    content.innerHTML = `
        <div class="program-header">
            <h3>60-Minute Pilates Program</h3>
            <p>For ${escapeHtml(program.studentName)} &bull; Level: ${program.level} &bull; ${formatDate(program.date)}</p>
        </div>
        ${program.notes ? `<p style="font-size:13px;color:var(--warning);margin-bottom:16px;padding:10px;background:var(--bg);border-radius:8px;">&#9888; ${escapeHtml(program.notes)}</p>` : ''}
        ${program.sections.map(section => `
            <div class="program-section">
                <div class="program-section-title">
                    ${escapeHtml(section.title)}
                    <span class="program-section-time">${section.duration}</span>
                </div>
                ${section.exercises.map(ex => `
                    <div class="exercise-item">
                        <span class="exercise-name">${escapeHtml(ex.name)}</span>
                        <span class="exercise-detail">${escapeHtml(ex.duration)} &mdash; ${escapeHtml(ex.detail)}</span>
                    </div>
                `).join('')}
            </div>
        `).join('')}
        <div class="program-total">Total Duration: 60 Minutes</div>
    `;
}

function regenerateProgram() {
    const students = Store.getStudents();
    const student = students.find(s => s.id === currentStudentId);
    if (!student) return;

    currentProgram = ExerciseDB.generateProgram(student);
    renderProgramModal(currentProgram);
}

function saveProgram() {
    if (!currentProgram || !currentStudentId) return;

    const students = Store.getStudents();
    const student = students.find(s => s.id === currentStudentId);
    if (!student) return;

    if (!student.programs) student.programs = [];
    currentProgram.id = generateId();
    student.programs.push(currentProgram);

    Store.saveStudents(students);
    document.getElementById('modal-program').classList.remove('active');
    currentProgram = null;
    renderStudentDetail();
}

function deleteProgram(programId) {
    const students = Store.getStudents();
    const student = students.find(s => s.id === currentStudentId);
    if (!student) return;

    student.programs = (student.programs || []).filter(p => p.id !== programId);
    Store.saveStudents(students);
    renderStudentDetail();
}

// --- Tabs ---
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));

    document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.view);
        });
    });

    // Student modal
    document.getElementById('btn-add-student').addEventListener('click', () => openStudentModal());
    document.getElementById('modal-student-close').addEventListener('click', closeStudentModal);
    document.getElementById('btn-cancel-student').addEventListener('click', closeStudentModal);
    document.getElementById('student-form').addEventListener('submit', saveStudent);

    // Student detail
    document.getElementById('btn-back-students').addEventListener('click', () => navigateTo('students'));
    document.getElementById('btn-edit-student').addEventListener('click', () => openStudentModal(currentStudentId));
    document.getElementById('btn-delete-student').addEventListener('click', deleteStudent);
    document.getElementById('btn-add-note').addEventListener('click', addNote);

    // Allow Ctrl+Enter to submit notes
    document.getElementById('new-note-text').addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            addNote();
        }
    });

    // Programs
    document.getElementById('btn-generate-program').addEventListener('click', openProgramModal);
    document.getElementById('modal-program-close').addEventListener('click', () => {
        document.getElementById('modal-program').classList.remove('active');
    });
    document.getElementById('btn-regenerate-program').addEventListener('click', regenerateProgram);
    document.getElementById('btn-save-program').addEventListener('click', saveProgram);

    // Tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Schedule navigation
    document.getElementById('btn-prev-week').addEventListener('click', () => {
        scheduleWeekOffset--;
        renderSchedule();
    });
    document.getElementById('btn-next-week').addEventListener('click', () => {
        scheduleWeekOffset++;
        renderSchedule();
    });

    // Search
    document.getElementById('student-search').addEventListener('input', (e) => {
        renderStudentsList(e.target.value);
    });

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    // Initialize
    navigateTo('dashboard');
});
