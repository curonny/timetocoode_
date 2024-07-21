/* @odoo-module */
import { Chatter } from "@mail/core/web/chatter";
import { patch } from "@web/core/utils/patch";
import { Component, useEnv,onWillStart,onMounted,useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";


patch(Chatter.prototype, {
 setup() {
        super.setup();
        this.env = useEnv();
        this.orm = useService("orm");
        this.action = useService("action");
        this.user = useService("user");
        this.threadId = this.props.threadId;
        this.threadModel = this.props.threadModel;
        this.userId = this.user.userId;
        this.state = useState({
        ...this.state,
        favorite: false,
        });
        console.log(this.props);
        console.log(this.state);
        console.log(this.state.favorite);
        console.log(this.threadModel);
        console.log(this.threadId);
        console.log(this.userId);
        this.isFavorite();
    },

        async onToggleFavorite() {
        const favorite = await this.isFavorite();
        if (favorite.length > 0) {
            if(favorite.length > 0){
            const id = favorite[0]['id'];
            this.state.favorite = false;
            await this.orm.unlink('my.favorite', [favorite[0]['id']]);
            }
        } else {
        this.state.favorite = true;
            await this.orm.create("my.favorite", [{
                        'user_id': this.userId,
                        'res_model': this.threadModel,
                        'res_id': this.threadId,
                    }]);
        }
    },

    async isFavorite() {
         const favorite =  await this.orm.searchRead(
            "my.favorite",
            [
                ["res_id", "=",this.threadId],
                ["user_id", "=",  this.userId],
                ["res_model", "=",  this.threadModel]
            ],
            ["id"]
        );
        this.state.favorite = favorite.length > 0 ? true : false;
        return favorite;
    }

});