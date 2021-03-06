import { measuresToTime, stepToTime } from './calculations';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, tap, map } from 'rxjs/operators';

const inputCollector$ = new Subject<{ name: string, value: number }>();

const valueSubs: { [key: string]: BehaviorSubject<number> } = {
    'm2t-signature-upper': new BehaviorSubject<number>(4),
    'm2t-signature-lower': new BehaviorSubject<number>(4),
    'm2t-bpm': new BehaviorSubject<number>(120),
    'm2t-measures': new BehaviorSubject<number>(16),
    's2t-bpm': new BehaviorSubject<number>(120),
    's2t-step-upper': new BehaviorSubject<number>(1),
    's2t-step-lower': new BehaviorSubject<number>(16),
}

const m2tResultSub = new BehaviorSubject<string>("no f*ing clue");
const s2tResultSub = new BehaviorSubject<string>("no f*ing clue");

initPage();

function initPage() {
    // initValueDisplays();
    initMeasuresToTime();
    initStepToTime();
    initInputCollection();


    const elem = document.getElementById('test-elem');
    if (elem instanceof HTMLSelectElement) {
        for (let i = 1; i < 257; i *= 2) {
            const opt = document.createElement('option');
            opt.value = i.toString();
            opt.innerText = i.toString();
            elem.appendChild(opt);
        }
    }
}


// function initValueDisplays() {
//     for (let key in valueSubs) {
//         const sub: BehaviorSubject<number> = valueSubs[key];
//         sub.pipe(
//             distinctUntilChanged(),
//             tap(n => console.log(`will set res-${key} to ${n}`)),
//         ).subscribe(n =>
//             document.getElementById(`res-${key}`).innerText = n.toString()
//         );
//     }
// }

function initStepToTime() {
    combineLatest([
        valueSubs['s2t-step-upper'],
        valueSubs['s2t-step-lower'],
        valueSubs['s2t-bpm'],
    ])
        .pipe(
            map(([stepUpper, stepLower, bpm]: number[]) => ({
                bpm,
                step: stepUpper / stepLower,
            })),
            map(opts => stepToTime(opts)),
            map(tInMs => {
                return tInMs.toFixed(2);
            })
        )
        .subscribe(s2tResultSub);

    s2tResultSub.subscribe(t => document.getElementById('res-s2t-time').innerText = t);
}

function initInputCollection() {
    inputCollector$
        .subscribe(event => valueSubs[event.name].next(event.value));

    const inputCollection = document.getElementsByTagName('input');
    for (let i = 0; i < inputCollection.length; ++i) {
        const item = inputCollection.item(i);

        if (item instanceof HTMLInputElement) {
            item.onkeyup = announceInput;
            item.onchange = announceInput;
        }
    }

    const selects = document.getElementsByTagName('select');
    for (let i = 0; i < selects.length; ++i) {
        const item = selects.item(i);

        if (item instanceof HTMLSelectElement) {
            item.onchange = announceInput;
        }
    }
}

function initMeasuresToTime() {
    combineLatest([
        valueSubs['m2t-signature-upper'],
        valueSubs['m2t-signature-lower'],
        valueSubs['m2t-bpm'],
        valueSubs['m2t-measures']
    ])
        .pipe(
            map(([sigUp, sigLow, bpm, measures]: number[]) => ({
                bpm,
                measures,
                // todo: don't assume 4/4 all the time
                beats_per_measure: sigUp,
            })),
            map(opts => measuresToTime(opts)),
            map(tInMs => {
                const d = new Date(tInMs);
                const mins = lpad(d.getMinutes().toFixed(0));
                const secs = lpad(d.getSeconds().toFixed(0));
                return `${mins}:${secs}`;
            })
        )
        .subscribe(m2tResultSub);

    m2tResultSub.subscribe(t => document.getElementById('res-m2t-time').innerText = t);
}

function announceInput(event: Event) {
    const { value, name } = (event.target as HTMLInputElement);

    inputCollector$.next({
        value: Number(value),
        name,
    });
}

function lpad(s: string) {
    return s.length < 2 ? `0${s}` : s;
}

interface Theme { light: any, dark: any };
const themes: Theme = {
    'dark': {
        color: 'rgb(106, 212, 181)',
        backgroundColor: 'black',
    },
    'light': {
        backgroundColor: 'white',
        color: 'black',
    },
}

let theme: (keyof Theme) = localStorage.getItem('theme') as '' || 'dark';

applyTheme();

function toggleTheme() {
    console.log('theme', theme);
    theme = theme == 'dark' ? 'light' : 'dark';
    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        console.warn('could not set style preference');
    }
    applyTheme();
}



function applyTheme() {
    console.log(`applying ${theme} theme`);
    for (let key in themes[theme]) {
        document.body.style[key as any] = themes[theme][key];
    }
}

Object.assign(document, {
    toggleTheme
});
