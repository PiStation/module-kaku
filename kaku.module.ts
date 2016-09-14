import * as PiStation from "../../node_modules/pistation-definitions/PiStation";
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
        var lightEnabled = this.connector.enableKaku(address, unit);

        lightEnabled.subscribe(
            (e)=>console.log('Now with observable update stream when message is send queue and update data from exec callback', e),
            (e)=>{console.log('erroorrrrrrrr', e)},
            () => console.log('kaku message command completed!'));

        return lightEnabled.map((event=> {
            return {value: 'Light Enabled! '}
        }));
    }
}