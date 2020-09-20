/// <reference path="../abstract/BCTransportPipe.ts" />
/// <reference path="ObsidianPipeConnector.ts" />
class PipeObsidian extends BCTransportPipe {
    public get material(): string {
        return "obsidian"
    }

    public get pipeConnector(): PipeConnector {
        if (!this.connector) this.connector = new ObsidianPipeConnector();
        return this.connector;
    }

    public get renderGroups(): RenderGroups {
        return {
            main: ICRender.getGroup("BCTransportPipe"),
            addition: ICRender.getGroup("BCPipeObsidian"),
        };
    }

    protected get pipeTexture(): PipeTexture {
        const textureName = `pipe_${this.transportType}_${this.material}`
        if(!this.texture) this.texture = new PipeTexture({name: textureName, data: 0}, {name: textureName, data: 1});
        return this.texture;
    }
}