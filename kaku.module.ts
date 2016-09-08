import * as PiStation from "../../node_modules/pistation-definitions/PiStation.ts";
import {Connector433} from "../../connectors/connector-433/connector433.connector";
import {Module} from "../../app/module";
import {Observable} from 'rxjs/Rx';

export class Kaku extends Module {
    static moduleId:string;

    protected connector:Connector433;

    constructor(app){
        super('Kaku');

        this.connector = app.getConnector('connector-433');

        this.addFunction(
            new PiStation.Function('enableLight', [
                new PiStation.ArgumentTextbox({
                    key:'address',
                    label:'address',
                    value:true,
                    required: true
                }),
                new PiStation.ArgumentTextbox({
                    key:'unit',
                    label:'Unit',
                    value:true,
                    required: true
                }),
            ])
        );

        this.addFunction(
            new PiStation.Function('disableLight', [
                new PiStation.ArgumentTextbox({
                    key:'address',
                    label:'address',
                    value:true,
                    required: true
                }),
                new PiStation.ArgumentTextbox({
                    key:'unit',
                    label:'Unit',
                    value:true,
                    required: true
                }),
            ])
        );

        this.addFunction(
            new PiStation.Function('dimLight', [
                new PiStation.ArgumentTextbox({
                    key:'address',
                    label:'address',
                    required: true
                }),
                new PiStation.ArgumentTextbox({
                    key:'unit',
                    label:'Unit',
                    required: true
                }),
                new PiStation.ArgumentTextbox({
                    key:'dim',
                    label:'Dim level (0 - 15)',
                    required: true
                }),
            ])
        );
    }

    enableLight(args){
        console.log(args);
        var address = args.address;
        var unit = args.unit;
        console.log(`Module call enable light`, address, unit);
        var enableKaku = Observable.bindCallback(this.connector.enableKaku);
        var lightEnabled = enableKaku(address, unit);

        lightEnabled.subscribe((event) => {
            console.log('light enableddddd');
        })

        return lightEnabled.map((event=> {
            return {value: 'Light Enabled! '}
        }))

        /*
        const dummyFunctionUpdates = Observable //dummy update stream from connector
            .interval(500)
            .timeInterval()
            .take(3);

        return dummyFunctionUpdates;
        */
    }
}