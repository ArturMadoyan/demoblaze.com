describe('example to-do app', () => {
    before(() => {
        cy.intercept("https://api.demoblaze.com/view").as("view")
        cy.visit("https://www.demoblaze.com/");
    })

    it('', () => {
        cy.request({
            method: "POST",
            url: "https://api.demoblaze.com/view",
            body: {"id": "1"}
        }).its("body.title").should("include", "galaxy s6");

        cy.getCookie("user").then((c) => {
            let userCookie = "user=" + (c.value).toString();
            cy.log(userCookie)
            cy.request({
                method: "POST",
                url: "https://api.demoblaze.com/addtocart",
                body:
                    {
                        id: "5085fa38-e391-285b-5e5f-e2a3342ee863",
                        cookie: userCookie,
                        prod_id: 1,
                        flag: false
                    }
            })
        })

        cy.contains("Cart").click()
        cy.wait("@view")
        cy.get('#totalp').should('contain.text', 360)
    })
})
