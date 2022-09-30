export default function statusProcessor(res) {
    let type = ""
    if (res.status.toString().startsWith("1")) {
        type = "info"
    }
    else if (res.status.toString().startsWith("2")) {
        type = "success"
    }
    else if (res.status.toString().startsWith("3")) {
        type = "info"
    }
    else if (res.status.toString().startsWith("4")) {
        type = "error"
    }
    else if (res.status.toString().startsWith("5")) {
        type = "warning"
    }
    else {
        type = "error"
    }
    return {
        type: type,
        statusText: res.statusText
    }

}

