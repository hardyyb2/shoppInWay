
<Button
    variant="contained"
    style={{
        fontWeight: 'bold',
        background: (formIsValid ? '#c51162' : '#1d1d1d'),
        color: (formIsValid ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)'),
        marginBottom: '20px'
    }}
    onClick={() => {
        let details = {}
        for (let key in orderForm) {
            if (key === 'phone') {
                details[key] = parseInt(orderForm[key].value)
            }
            else {
                details[key] = orderForm[key].value
            }
        }
        props.handleDeliveryOptions(details)
    }}
    disabled={!formIsValid}

>
    {/* Choose Delivery Method */}
                 Order
            </Button>

