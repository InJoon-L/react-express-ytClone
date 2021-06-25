import React from 'react'
import { Row, Col, Button } from 'antd'

function StreamingPage() {
    return (
        <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{width: '100%', padding: '3rem 4rem'}}>
    
                        <video style={{ width: '100%' }} src controls />
                        
                        <Button style={{ float: 'right' }} type="primary" size="large" onClick>
                            Start Streaming
                        </Button>
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    SideChat
                </Col>
            </Row>
    )
}

export default StreamingPage
